import axios from "axios";
import type { IUser } from "@/types/Users";

const urlBase = "Account";

export class UserService {
  // Obtener todos los usuarios
  static async getUsers(): Promise<IUser[]> {
    try {
      const response = await axios.get(`${urlBase}/GetUsers`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  // Obtener usuario por ID
  static async getUserById(id: string): Promise<IUser> {
    try {
      const response = await axios.get(`${urlBase}/GetUserById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  }

  // Crear usuario
  static async createUser(user: IUser): Promise<void> {
    try {
      await axios.post(`${urlBase}/register`, user);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  // Actualizar usuario
  static async updateUser(user: IUser): Promise<void> {
    try {
      await axios.put(`${urlBase}/UpdateUserData`, user);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  }

  // Eliminar usuario
  static async deleteUser(id: string): Promise<void> {
    try {
      await axios.delete(`${urlBase}/DeleteUser/${id}`);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  }
}
