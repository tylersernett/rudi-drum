import axios from 'axios'
import { API_URL } from '../../config'

const logout = async (token: string): Promise<void> => {
  await axios.delete(`${API_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Since there's no data to return, simply return void (Promise<void>).
};

export default { logout };