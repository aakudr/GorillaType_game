import { useState, useEffect } from "react";
import { useTyping } from "./useTyping";

import GameTypingArea from "./components/GameTypingArea";
import GameStats from "./components/GameStats";
import GameKeyboard from "./components/GameKeyboard";

import styles from "./Game.module.sass";

function Game() {
  const [wordState, setWordState] = useState({
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    charPosition: 0,
  });
  const [gameStats, setGameStats] = useState(
    getStatsFromWordState(wordState, Date.now())
  );
  const keyboardState = useTyping();

  useEffect(() => {
    setInterval(() => {
      setGameStats(getStatsFromWordState(wordState, gameStats.startTime));
    }, 1000);
  }, []);

  useEffect(() => {
    setGameStats(getStatsFromWordState(wordState, gameStats.startTime));
  }, [wordState]);

  useEffect(() => {
    setWordState(getUpdatedWordState(wordState, keyboardState));
    console.log(keyboardState);
  }, [keyboardState]);

  return (
    <div className={styles.game}>
      <GameTypingArea wordState={wordState} />
      <GameStats gameStats={gameStats} />
      <GameKeyboard keyboardState={keyboardState} />
    </div>
  );
}

function getStatsFromWordState(
  wordState: { text: string; charPosition: number },
  startTime: number
) {
  const { text, charPosition } = wordState;

  //Calculate current word count
  const wordPosition = text
    .slice(0, charPosition)
    .split("")
    .reduce((acc, curr) => {
      if (curr === " ") acc++;
      return acc;
    }, 0);

  const timeElapsed = Date.now() - startTime;
  const timeElapsedInMinutes = timeElapsed / 60000;

  const wpm = Math.round(wordPosition / timeElapsedInMinutes);
  const kpm = Math.round(charPosition / timeElapsedInMinutes);

  const accuracy = 1;

  return {
    startTime: startTime,
    wpm,
    kpm,
    accuracy,
  };
}

function getUpdatedWordState(
  wordState: { text: string; charPosition: number },
  keyboardState: string
) {
  const { text, charPosition } = wordState;

  const currentChar = text[charPosition];

  if (keyboardState === currentChar) {
    return {
      text: text,
      charPosition: charPosition + 1,
    };
  } else {
    return {
      text: text,
      charPosition: charPosition,
    };
  }
}

export default Game;
