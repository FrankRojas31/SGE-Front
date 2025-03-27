export interface IAuthUser {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiration?: string;
}

export interface ILoginUser {
  email: string,
  password: string,
}

export interface TokenModel {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
}
