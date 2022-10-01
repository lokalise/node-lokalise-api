export interface RefreshTokenResponse {
  access_token: string;
  scope: string;
  expires_in: string | number;
  token_type: string;
}
