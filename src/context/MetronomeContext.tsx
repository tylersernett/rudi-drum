import { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { IMetronome, BlinkToggleOption} from "../types";

type MetronomeContextType = {
  metronome: IMetronome,
  setMetronome: Dispatch<SetStateAction<IMetronome>>
  resetMetronome: () => void;
}

const MetronomeContext = createContext<MetronomeContextType | null>(null);

const initialMetronomeState = {
  title: '',
  bpm: 120,
  subdivisions: 1,
  blinkToggle: BlinkToggleOption.Downbeat,
};

export const useMetronomeContext = () => {
  const context = useContext(MetronomeContext);
  if (!context) {
    throw new Error('useUserContext must be within MetronomeProvider');
  }
  return context;
};

export const MetronomeProvider = ({ children }: { children: ReactNode }) => {
  const [metronome, setMetronome] = useState<IMetronome>(initialMetronomeState);
  const resetMetronome = () => setMetronome(initialMetronomeState);

  return (
    <MetronomeContext.Provider value={{ metronome, setMetronome, resetMetronome }}>
      {children}
    </MetronomeContext.Provider>
  );
};
