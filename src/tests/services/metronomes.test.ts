import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import metronomeServices from '../../services/metronomes'; // Replace with the actual module path
import { API_URL } from '../../../config';
import { BlinkToggleOption, RampToggleOption, IMetronome, MetronomeDBItem } from '../../types';
import { MockAuthService } from './MockAuthService'; // Adjust the path to match your project structure

const { create, getOwn, update, remove } = metronomeServices
const mock = new MockAdapter(axios);
const token = MockAuthService.getToken();
const metronome: IMetronome = {
  title: 'testMet',
  bpm: 222,
  subdivisions: 3,
  blinkToggle: BlinkToggleOption.Off,
  rampToBpm: 120,
  rampDuration: 0,
  rampToggle: RampToggleOption.Off,
};
const metronomeItem: MetronomeDBItem = {
  ...metronome,
  id: 123,
  createdAt: '1000',
  updatedAt: '1000',
  user: { username: 'testUser' },
}
const metronomeId = 123;

describe('metronome API functions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should create a metronome', async () => {
    mock.onPost(`${API_URL}/metronomes`).reply(201, metronomeItem);
    const result = await create(metronome, token);
    expect(result).toEqual(metronomeItem);
  });

  it('should handle create errors', async () => {
    mock.onPost(`${API_URL}/metronomes`).reply(500);
    await expect(create(metronome, token)).rejects.toThrow("Request failed with status code 500")
  });

  it('should get own metronomes', async () => {
    mock.onGet(`${API_URL}/metronomes`).reply(200, [metronomeItem]);
    const result = await getOwn(token);
    expect(result).toEqual([metronomeItem]);
  });

  it('should handle get own metronomes errors', async () => {
    mock.onGet(`${API_URL}/metronomes`).reply(500);
    await expect(getOwn(token)).rejects.toThrow("Request failed with status code 500")
  });

  it('should update a metronome', async () => {
    mock.onPut(`${API_URL}/metronomes/${metronomeId}`).reply(200, metronomeItem);
    const result = await update(metronomeItem, token);
    expect(result).toEqual(metronomeItem);
  });

  it('should handle update errors', async () => {
    mock.onPut(`${API_URL}/metronomes/${metronomeId}`).reply(500);
    await expect(update(metronomeItem, token)).rejects.toThrow("Request failed with status code 500");
  });

  it('should remove a metronome', async () => {
    mock.onDelete(`${API_URL}/metronomes/${metronomeId}`).reply(204);
    await remove(metronomeId, token);
  });

  it('should handle remove errors', async () => {
    mock.onDelete(`${API_URL}/metronomes/${metronomeId}`).reply(500);
    await expect(remove(metronomeId, token)).rejects.toThrow("Request failed with status code 500");
  });
});
