import { IUser } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseUsername = (username: unknown): string => {
  if (!isString(username)) {
    throw new Error('Username must be a string');
  }
  return username;
};

const parseToken = (token: unknown): string => {
  if (!isString(token)) {
    throw new Error('Token must be a string');
  }
  return token;
};

export const toNewUser = (obj: unknown): IUser => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Data must be an object');
  }

  if (!('username' in obj) || !('token' in obj)) {
    const missingFields = [];
    if (!('username' in obj)) {
      missingFields.push('username');
    }
    if (!('token' in obj)) {
      missingFields.push('token');
    }
    throw new Error(`Missing fields: ${missingFields.join(', ')}`);
  }

  return {
    username: parseUsername(obj.username),
    token: parseToken(obj.token),
  };
}