import axios from 'axios';
import { NotAuthenticatedError } from '../../ApiError';
import {
  API_VERSION,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_TOKEN_URL,
  SERVER_URL
} from '../../config';
import { GoogleTokenInfo, GoogleTokens, GoogleUser } from '../../types';

export const googleOauthTokenParams = {
  client_id: GOOGLE_OAUTH_CLIENT_ID,
  client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
  redirect_uri: `${SERVER_URL}/${API_VERSION}/oauth/google`,
  grant_type: 'authorization_code'
};

export async function getGoogleOAuthTokens(
  code: string
): Promise<GoogleTokens> {
  try {
    const res = await axios.post<GoogleTokens>(
      GOOGLE_OAUTH_TOKEN_URL,
      new URLSearchParams({ ...googleOauthTokenParams, code }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return res.data;
  } catch (err) {
    throw new NotAuthenticatedError();
  }
}

export async function getGoogleUser(
  idToken: string,
  accessToken: string
): Promise<GoogleUser> {
  try {
    const res = await axios.get<GoogleUser>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      }
    );
    return res.data;
  } catch (err) {
    throw new NotAuthenticatedError();
  }
}

export async function verifyGoogleUser(accessToken: string) {
  try {
    const res = await axios.get<GoogleTokenInfo>(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    return res.data;
  } catch (err) {
    throw new NotAuthenticatedError();
  }
}
