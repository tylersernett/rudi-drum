import axios from 'axios';
import { API_URL } from '../../config';
import { IMetronome, MetronomeDBItem } from '../types';

const createHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const create = async (metronome: IMetronome, token: string): Promise<MetronomeDBItem> => {
  try {
    const headers = createHeaders(token);
    const response = await axios.post<MetronomeDBItem>(`${API_URL}/metronomes`, metronome, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating metronome:', error);
    throw error;
  }
};

const getOwn = async (token: string): Promise<MetronomeDBItem[]> => {
  try {
    const headers = createHeaders(token);
    const response = await axios.get<MetronomeDBItem[]>(`${API_URL}/metronomes`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching metronomes:', error);
    throw error;
  }
}

const update = async (metronome: MetronomeDBItem, token: string): Promise<MetronomeDBItem> => {
  console.log('attempting update of: ', metronome);
  try {
    const headers = createHeaders(token);
    const id = metronome.id;
    const response = await axios.put<MetronomeDBItem>(`${API_URL}/metronomes/${id}`, metronome, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating metronome:', error);
    throw error;
  }
}

const remove = async (id: number, token: string) => {
  try {
    const headers = createHeaders(token);
    await axios.delete(`${API_URL}/metronomes/${id}`, { headers });
  } catch (error) {
    console.error('Error deleting metronome:', error);
    throw error;
  }
};

export default { create, getOwn, update, remove };
