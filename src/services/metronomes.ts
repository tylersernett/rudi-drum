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

export default { create };
