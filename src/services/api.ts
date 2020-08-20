import axios, { AxiosResponse, AxiosError } from 'axios'
import { logout } from '../utilities/auth'

const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: { 'authorization': localStorage.getItem("accessToken") }
})

api.interceptors.response.use((response: AxiosResponse) => {
    return response
}, (error: AxiosError) => {
    const response = error.response as AxiosResponse
    if (response.status === 401) return logout()
    return Promise.reject(error)
})

export default api