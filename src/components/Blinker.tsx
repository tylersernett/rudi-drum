import { useMetronomeContext } from "../context/MetronomeContext";
import { BlinkToggleOption } from "../types";

type Visibility = "visible" | "hidden";

interface BlinkingSquareProps {
  isBlinking: boolean;
  // setIsBlinking: Dispatch<SetStateAction<boolean>>;
  setIsBlinking: (newIsBlinking: boolean) => void;
}

const Blinker: React.FC<BlinkingSquareProps> = ({ isBlinking, setIsBlinking }) => {
  const { metronome } = useMetronomeContext();
  const { blinkToggle } = metronome;

  const squareStyle = {
    width: "40px",
    height: "40px",
    backgroundColor: isBlinking ? "orange" : "lightgray",
    borderRadius: '100%',
    visibility: blinkToggle !== BlinkToggleOption.Off ? "visible" : "hidden" as Visibility, // Cast to Visibility
    // transition: "background-color 0.2s ease-in-out",
  };

  if (isBlinking) {
    setTimeout(() => {
      setIsBlinking(false)
    }, 60);
  }

  return (
    <>
      <div id='sq' style={squareStyle} />
    </>
  )
};

export default Blinker