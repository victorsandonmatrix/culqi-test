import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig
} from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export const instanceApi: AxiosInstance = axios.create({
  baseURL: apiUrl
})

instanceApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error: AxiosError) {
    return Promise.reject(error.message)
  }
)
