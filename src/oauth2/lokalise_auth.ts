import { AuthData as AuthDataInterface } from "../interfaces/auth_data";
import { AuthRequest } from "./auth_request";
import { AuthError } from "../models/auth_error";

export class LokaliseAuth {
  authData: AuthDataInterface = {
    client_id: "",
    client_secret: "",
  };

  /*
   * Instantiate LokaliseAuth to work with OAuth 2 tokens
   * @param clientId      string, mandatory
   * @param clientSecret  string, mandatory
   * @returns             LokaliseAuth object to work with.
   */
  constructor(clientId: string, clientSecret: string) {
    if (
      clientId == null ||
      clientId.length == 0 ||
      clientSecret == null ||
      clientSecret.length == 0
    ) {
      throw new Error(
        "Error: Instantiation failed: Please pass client id and client secret"
      );
    }

    this.authData.client_id = clientId;
    this.authData.client_secret = clientSecret;
  }

  auth(
    scope: string | string[],
    redirect_uri?: string,
    state?: string
  ): string {
    if (scope instanceof Array) {
      scope = scope.join(" ");
    }

    const params: { [key: string]: string } = {
      client_id: this.authData.client_id,
      scope: scope,
    };

    if (state) {
      params["state"] = state;
    }

    if (redirect_uri) {
      params["redirect_uri"] = redirect_uri;
    }

    return this.buildUrl(params);
  }

  async token(code: string): Promise<any> {
    const params = {
      ...this.base_params(),
      ...{
        code: code,
        grant_type: "authorization_code",
      },
    };

    return await this.doRequest(params);
  }

  async refresh(refresh_token: string): Promise<any> {
    const params = {
      ...this.base_params(),
      ...{
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      },
    };

    return await this.doRequest(params);
  }

  private async doRequest(params: { [key: string]: string }): Promise<any> {
    try {
      const data = await AuthRequest.createPromise("token", "POST", params);
      return Promise.resolve(data["json"]);
    } catch (err) {
      return Promise.reject(this.handleReject(err));
    }
  }

  private buildUrl(params: { [key: string]: string }): string {
    const url = new URL("auth", AuthRequest.urlRoot);
    const sParams = new URLSearchParams(params);
    url.search = sParams.toString();
    return url.toString();
  }

  private base_params(): { [key: string]: string } {
    return {
      client_id: this.authData.client_id,
      client_secret: this.authData.client_secret,
    };
  }

  private handleReject(data: unknown): AuthError {
    return <AuthError>data;
  }
}
