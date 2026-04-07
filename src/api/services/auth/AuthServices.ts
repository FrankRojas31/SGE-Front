import { GenericRequest } from '@/api/GenericRequest'
import type { IAuthUser, ILoginUser, IRegisterUser } from '@/types/Auth/Users'
import { isMockEnabled } from '@/api/config/mock.config'
import { LoginAuthMock, RegisterAuthMock } from '@/api/mocks/AuthServices.mock'

const urlBase = 'Account'

export const LoginAuth = async (userLogin: ILoginUser) => {
  if (isMockEnabled()) return LoginAuthMock(userLogin)

  return await GenericRequest<IAuthUser>({
    url: `${urlBase}/login`,
    method: 'POST',
    data: {
      email: userLogin.email,
      password: userLogin.password,
    },
  })
}

export const RegisterAuth = async (userRegister: IRegisterUser) => {
  if (isMockEnabled()) return RegisterAuthMock(userRegister)

  return await GenericRequest<IRegisterUser>({
    url: `${urlBase}/register`,
    method: 'GET',
    data: {
      name: userRegister.name,
      email: userRegister.password,
      confirmPassword: userRegister.confirmPassword,
      rol: userRegister.rol,
      estatusUsuario: userRegister.estatusUsuario,
    },
  })
}
