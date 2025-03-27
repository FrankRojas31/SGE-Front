import { GenericRequest } from "@/api/GenericRequest";
import type { IAuthUser, ILoginUser } from "@/types/Auth/Users";

const urlBase = "Account"

export const LoginAuth = async(userLogin: ILoginUser) => {
  return await GenericRequest<IAuthUser>({ url: `${urlBase}/login`, method: "POST", data: {
    email: userLogin.email,
    password: userLogin.password,
  }});
}
