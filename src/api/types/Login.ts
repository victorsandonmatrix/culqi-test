export interface LoginResponse {
  token: string
  user: User
}

export interface LoginPayload {
  correo: string
  password: string
}

export interface User {
  id: number
  nombre: string
  correo: string
  cargo: string
  departamento: string
  oficina: string
  estadoCuenta: string
}
