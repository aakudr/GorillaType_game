import { useEffect, useState } from "react";

export const useTyping = () => {
  const [keyboardState, setKeyboardState] = useState("");

  //global keypress event listener. endlessly and asynchrously updates the state of the keyboard.
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeyboardState(e.key);
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };

  }, [keyboardState]);

  return keyboardState;
};
