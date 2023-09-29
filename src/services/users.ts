// users.ts
import axios from 'axios';
import { API_URL } from '../../config';
import { LoginCredentials } from '../types';

interface User {
  id: number;
  username: string;
  disabled: boolean;
}

const create = async (userData: LoginCredentials): Promise<User> => {
  try {
    const response = await axios.post<User>(`${API_URL}/users`, userData);
    console.log('axios user data: ', response.data)
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default { create, };
