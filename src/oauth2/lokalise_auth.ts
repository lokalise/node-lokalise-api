import { AuthData as AuthDataInterface } from "../interfaces/auth_data";
import { AuthRequest } from "./auth_request";

export class LokaliseAuth {
  authData: AuthDataInterface = {
    client_id: "",
    client_secret: "",
  };

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
    redirect_uri: string | null = null,
    state: string | null = null
  ) {
    if (scope instanceof Array) {
      scope = scope.join(" ");
    }

    const params: { [key: string]: string } = {
      client_id: this.authData.client_id,
      scope: scope,
    };

    if (state != null) {
      params["state"] = state;
    }

    if (redirect_uri != null) {
      params["redirect_uri"] = redirect_uri;
    }

    return this.buildUrl(params);
  }

  private buildUrl(params: { [key: string]: string }) {
    const url = new URL("auth", AuthRequest.urlRoot);
    const sParams = new URLSearchParams(params);
    url.search = sParams.toString();
    return url.toString();
  }
}
