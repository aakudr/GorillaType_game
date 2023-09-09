import KeyboardKey from "./KeyboardKey";

import styles from "./GameKeyboard.module.sass";

type Props = { keyboardState: string };

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const GameKeyboard = (props: Props) => {
  return keys.map((row, key) => {
    return (
      <div className={styles.row} key={key}>
        {row.map((key) => {
          return (
            <KeyboardKey
              key={key}
              keyName={key}
              isPressed={props.keyboardState == key}
            />
          );
        })}
      </div>
    );
  });
};

export default GameKeyboard;
