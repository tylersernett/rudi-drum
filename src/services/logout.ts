import axios from 'axios'
import { API_URL } from '../../config'

const logout = async (token: string) => {
  const response = await axios.delete(`${API_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default { logout }