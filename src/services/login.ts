import axios from 'axios'
import { API_URL } from '../../config'
import { LoginCredentials } from '../types'
import { IUser } from '../types'

const login = async (credentials: LoginCredentials): Promise<IUser> => {
  const response = await axios.post<IUser>(`${API_URL}/login`, credentials)
  return response.data
}

export default { login }