import { useEffect, useState } from "react"

import styles from "./GameTypingArea.module.sass"

type Props = {
  wordState: {
    text: string,
    charPosition: number
  }
}

const getTextState = (wordState: { text: string, charPosition: number }) => {
  const beforeChar = wordState.text.slice(0, wordState.charPosition)
  const currentChar = wordState.text[wordState.charPosition]
  const afterChar = wordState.text.slice(wordState.charPosition + 1)

  return {
    beforeChar: beforeChar,
    currentChar: currentChar,
    afterChar: afterChar
  }
}


const GameTypingArea = (props: Props) => {
  const [textState, setTextState] = useState(getTextState(props.wordState))

  useEffect(() => {
    setTextState(getTextState(props.wordState))
  }, [props.wordState])

  return (
    <div>
      <span className={styles.before}>{textState.beforeChar}</span>

      <span className={styles.current}>{textState.currentChar}</span>

      <span className={styles.after}>{textState.afterChar}</span>
    </div>
  )
}

export default GameTypingArea