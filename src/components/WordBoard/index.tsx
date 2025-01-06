import './style.less'
import Word from "../Word";

interface WordBoardProps {
    words: string[],
    currentWordIndex: number,
    winningWord: string,
    isGameEnded: boolean,
    addGreenLetter: (letter: string) => void,
    addYellowLetter: (letter: string) => void
}
const WordBoard = (props: WordBoardProps) => {
    return (
        <div className="wordBoard">
            {props.words.map((word: string, index: number) => {
                return <Word word={word} winningWord={props.winningWord} key={index} isLastWord={index>=props.currentWordIndex ? true : false} isGameEnded={props.isGameEnded} addGreenLetter={props.addGreenLetter} addYellowLetter={props.addYellowLetter}/>
            })}
        </div>
    )
}

export default WordBoard;