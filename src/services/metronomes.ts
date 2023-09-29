import axios from 'axios';
import { API_URL } from '../../config';
import { IMetronome } from '../context/MetronomeContext';

const create = async (metronome: IMetronome, token: string): Promise<IMetronome> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post<IMetronome>(`${API_URL}/metronomes`, metronome, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating metronome:', error);
    throw error;
  }
};

const getOwn = async (token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.get(`${API_URL}/metronomes`, { headers })
    return response.data
  } catch (error) {
    console.error('Error fetching metronomes:', error);
    throw error;
  }
}

export default { create, getOwn };
