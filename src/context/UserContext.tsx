import { createContext, useContext, useState, ReactNode } from 'react';

export interface IUser {
  username: string;
  bearerToken: string;
}

type UserContextType = IUser & {
  setUserInfo: (username: string, bearerToken: string) => void;
  clearUserInfo: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be within UserProvider');
  }

  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>({
    username: '',
    bearerToken: '',
  });

  const setUserInfo = (username: string, bearerToken: string) => {
    setUser({ username, bearerToken });
  };

  const clearUserInfo = () => {
    setUser({ username: '', bearerToken: '' });
  };

  return (
    <UserContext.Provider value={{ ...user, setUserInfo, clearUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
