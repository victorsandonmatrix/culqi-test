import type { AxiosResponse } from 'axios'

export type ResponseBase<T> = AxiosResponse<{
  status: string
  data: T
  total: number
}>
