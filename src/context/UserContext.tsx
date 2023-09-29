import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface IUser {
  username: string;
  token: string;
}

type UserContextType = {
  user: IUser;
  clearUserInfo: () => void;
  setUser: Dispatch<SetStateAction<IUser>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be within UserProvider');
  }
  return context;
};

const initialUserState = {
  username: '',
  token: '',
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(initialUserState);
  const clearUserInfo = () => setUser(initialUserState);

  return (
    <UserContext.Provider value={{ user, clearUserInfo, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
