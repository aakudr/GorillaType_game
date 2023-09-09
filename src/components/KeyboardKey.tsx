import styles from "./KeyboardKey.module.sass";

type Props = {
  keyName: string;
  isPressed: boolean;
};

const KeyboardKey = (props: Props) => {
  return (
    <div
      className={
        props.isPressed ? `${styles.pressed} ${styles.key}` : styles.key
      }
    >
      {props.keyName}
    </div>
  );
};

export default KeyboardKey;
