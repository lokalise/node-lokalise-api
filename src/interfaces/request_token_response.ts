export interface RequestTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: string | number;
  token_type: string;
}
