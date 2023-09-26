import axios from 'axios'
import { API_URL } from '../../config'
import { LoginCredentials } from '../types'

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data
}

export default { login }