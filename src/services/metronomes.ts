import axios from 'axios';
import { API_URL } from '../../config';
import { IMetronome, MetronomeItem } from '../context/MetronomeContext';

const create = async (metronome: IMetronome, token: string): Promise<MetronomeItem> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post<MetronomeItem>(`${API_URL}/metronomes`, metronome, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating metronome:', error);
    throw error;
  }
};

const getOwn = async (token: string): Promise<MetronomeItem[]> => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    // const response = await axios.get<MetronomeItem[]>(`${API_URL}/metronomes`, { headers })
    const response = await axios.get<MetronomeItem[]>(`${API_URL}/metronomes`, { headers })
    return response.data
  } catch (error) {
    console.error('Error fetching metronomes:', error);
    throw error;
  }
}

const remove = async (id: number, token: string) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Send a DELETE request to the backend API
    await axios.delete(`${API_URL}/metronomes/${id}`, { headers });

    // The server will respond with a 204 status code if successful
  } catch (error) {
    console.error('Error deleting metronome:', error);
    throw error;
  }
};

export default { create, getOwn, remove };
