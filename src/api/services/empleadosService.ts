import { instanceApi } from '../instance'
import type { Empleado } from '../types/Empleados'
import type { ResponseBase } from '../types/ResponseBase'

export const getEmpleados = async (page: number) => {
  const { data } = await instanceApi.get<void, ResponseBase<Empleado[]>>(
    `/empleados?limit=10&page=${page}`
  )
  return data
}
