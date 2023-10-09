export interface LoginCredentials {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  token: string;
}

export type Direction = 'asc' | 'desc' | undefined;

export enum BlinkToggleOption {
  Off = "off",
  Downbeat = "downbeat",
  All = "all",
  MonoAll = "mono all",
}

export interface IMetronome {
  title: string;
  bpm: number;
  subdivisions: number;
  blinkToggle: BlinkToggleOption;
}

export interface MetronomeDBItem extends IMetronome{
  id: number;
  createdAt: string;
  updatedAt: string;
  user: { username: string };
}