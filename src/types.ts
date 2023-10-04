export interface LoginCredentials {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  token: string;
}

export type Direction = 'asc' | 'desc' | undefined;

export interface IMetronome {
  title: string;
  bpm: number;
  subdivisions: number;
  blinkToggle: boolean;
}

export interface MetronomeDBItem extends IMetronome{
  id: number;
  createdAt: string;
  updatedAt: string;
  user: { username: string };
}