import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type User = {
  id: string;
  name: string;
  profile_pic: string;
  role: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://67b2591bbc0165def8cd5643.mockapi.io';
  constructor(private readonly http: HttpClient) { }

  getAllUsers() {
    return firstValueFrom(
      this.http.get<User[]>(`${this.apiUrl}/api/dmc/users/users`)
    );
  }

  async findUser(name: string, password: string) {
    try {
      // Obtener la lista completa de usuarios
      const users = await this.getAllUsers();

      // Buscar el usuario que coincida con el nombre y la contraseña
      const foundUser = users.find(
        user => user.name.toLowerCase() === name.toLowerCase() && user.password === password
      );

      // Si encuentra el usuario, lo devuelve; de lo contrario, devuelve un mensaje de error
      return foundUser ? foundUser : `Usuario o contraseña incorrectos.`;
    } catch (error) {
      return 'Error al buscar usuario. Verifica la conexión a la API.';
    }
  }
}
