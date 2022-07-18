// OAuth Related Types
export interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface GoogleTokens {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export interface GoogleTokenInfo {
  issued_to: string;
  audience: string; // client id
  user_id: string;
  scope: string; // google scopes for eg. "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
  expires_in: number;
  email: string;
  verified_email: boolean;
  access_type: 'offline';
}
