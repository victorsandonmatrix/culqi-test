import { instanceApi } from '../instance'
import type { LoginPayload, LoginResponse } from '../types/Login'
import type { ResponseBase } from '../types/ResponseBase'

export const postLogin = async (correo: string, password: string) => {
  const { data } = await instanceApi.post<LoginPayload, ResponseBase<LoginResponse>>(
    '/auth/login',
    {
      correo,
      password
    }
  )
  return data
}
