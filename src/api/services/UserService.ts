import type { IAuthUsers } from '@/types/Auth/Users'
import { GenericRequest } from '../GenericRequest'
import { isMockEnabled } from '../config/mock.config'
import { GetUsersMock, DeleteUserMock } from '../mocks/UserService.mock'

const urlBase = 'Account'

export const GetUsers = async () => {
  if (isMockEnabled()) return GetUsersMock()

  return await GenericRequest<IAuthUsers[]>({ url: `${urlBase}/GetUsers`, method: 'GET' })
}

export const DeleteUser = async (id: number) => {
  if (isMockEnabled()) return DeleteUserMock(id)

  return await GenericRequest({ url: `${urlBase}/DeleteUser/${id}`, method: 'DELETE' })
}

// export const PutUser = async(user: IAuthUser){
//   return await GenericRequest({ url: `${urlBase}/UpdateAccount`, method: "PUT", data: {
//     id: user.id,
//     name: user.name,
//     password: user.password,
//     confirmPassword: user.confirmPassword,
//     rol: user.rol,
//     estatusUsuario = user.estatusUsuario
//   },})
// }
