import type { IAuthUser } from "@/types/Auth/Users";
import { GenericRequest } from "../GenericRequest";

const urlBase = "Account";

export const GetUsers = async () => {
  return await GenericRequest<IAuthUser[]>({ url: `${urlBase}/GetUsers`, method: "GET" });
}

export const DeleteUser = async(id: number) => {
  return await GenericRequest({ url: `${urlBase}/DeleteUser/${id}`, method: "DELETE",})
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
