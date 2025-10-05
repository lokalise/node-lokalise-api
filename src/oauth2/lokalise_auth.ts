import type { AuthData as AuthDataInterface } from "../interfaces/auth_data.js";
import type { RefreshTokenResponse } from "../interfaces/refresh_token_response.js";
import type { RequestTokenResponse } from "../interfaces/request_token_response.js";
import type { AuthError } from "../models/auth_error.js";
import { createPromise } from "./auth_request.js";

export class LokaliseAuth {
	public authData: AuthDataInterface;

	/**
	 * Instantiate LokaliseAuth to work with OAuth 2 tokens
	 *
	 * @param clientId - The client ID (mandatory)
	 * @param clientSecret - The client secret (mandatory)
	 * @param host - Optional host, defaults to "https://app.lokalise.com"
	 * @param version - Optional API version, defaults to "oauth2"
	 */
	constructor(
		clientId: string,
		clientSecret: string,
		host = "https://app.lokalise.com",
		version = "oauth2",
	) {
		if (!clientId || !clientSecret) {
			throw new Error(
				"Error: Instantiation failed: Please pass client ID and client secret",
			);
		}

		this.authData = {
			client_id: clientId,
			client_secret: clientSecret,
			host,
			version,
		};
	}

	/**
	 * Generate the authorization URL
	 *
	 * @param scope - The scope(s) for the authorization
	 * @param redirectUri - Optional redirect URI
	 * @param state - Optional state parameter
	 * @returns The authorization URL as a string
	 */
	auth(scope: string | string[], redirectUri?: string, state?: string): string {
		const scopeString = Array.isArray(scope) ? scope.join(" ") : scope;

		const params: Record<string, string> = {
			client_id: this.authData.client_id,
			scope: scopeString,
			...(state && { state }),
			...(redirectUri && { redirect_uri: redirectUri }),
		};

		return this.buildUrl(params);
	}

	/**
	 * Exchange an authorization code for an access token
	 *
	 * @param code - The authorization code
	 * @returns A promise resolving to the token response
	 */
	token(code: string): Promise<RequestTokenResponse> {
		const params = {
			...this.baseParams(),
			code,
			grant_type: "authorization_code",
		};

		return this.doRequest<RequestTokenResponse>(params);
	}

	/**
	 * Refresh an access token using a refresh token
	 *
	 * @param refreshToken - The refresh token
	 * @returns A promise resolving to the token response
	 */
	refresh(refreshToken: string): Promise<RefreshTokenResponse> {
		const params = {
			...this.baseParams(),
			refresh_token: refreshToken,
			grant_type: "refresh_token",
		};

		return this.doRequest<RefreshTokenResponse>(params);
	}

	/**
	 * Internal method to perform the API request
	 *
	 * @param params - Request parameters
	 * @returns A promise resolving to the API response
	 */
	private async doRequest<T>(params: Record<string, string>): Promise<T> {
		try {
			const data = await createPromise("token", "POST", params, this.authData);

			return data.json as T;
		} catch (err) {
			throw this.handleReject(err);
		}
	}

	/**
	 * Build the authorization URL
	 *
	 * @param params - URL parameters
	 * @returns The complete URL as a string
	 */
	private buildUrl(params: Record<string, string>): string {
		const url = new URL("auth", this.authData.host);
		url.search = new URLSearchParams(params).toString();
		return url.toString();
	}

	/**
	 * Get the base parameters for authentication requests
	 *
	 * @returns A record containing the client ID and client secret
	 */
	private baseParams(): Record<string, string> {
		return {
			client_id: this.authData.client_id,
			client_secret: this.authData.client_secret,
		};
	}

	/**
	 * Handle API request errors and transform them into an `AuthError`
	 *
	 * @param error - The error object
	 * @returns An `AuthError` instance
	 */
	private handleReject(error: unknown): AuthError {
		return error as AuthError;
	}
}
