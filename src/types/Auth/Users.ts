export interface IAuthUser {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiration?: string;
}

export interface IAuthUsers {
  accessFailedCount: number;
  concurrencyStamp: string;
  email: string;
  emailConfirmed: boolean
  estatusUsuario: string
  id: string
  isDeleted: boolean
  lockoutEnabled: boolean
  name: string
  normalizedEmail: string
  normalizedUserName: string
  userName: string

}

export interface ILoginUser {
  email: string,
  password: string,
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  rol: "PROFESOR",
  estatusUsuario: "ACTIVO"
}

export interface TokenModel {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: string;
}
