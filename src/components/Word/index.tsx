import { useEffect, useState } from "react"
import Letter from "../Letter"
import "./style.less"

interface WordProps {
    word: string,
    winningWord: string,
    isLastWord: boolean,
    isGameEnded: boolean,
    addGreenLetter: (letter: string) => void,
    addYellowLetter: (letter: string) => void
}

const Word = (props: WordProps) => {
    const [wordSplitted, setWordSplitted] = useState<Array<string>>(Array(5).fill(""))

    useEffect(() => {
        let result = Array(5).fill("")
        const tmp = props.word.split("")
        for (var i = 0; i < tmp.length; i++) {
            result[i] = tmp[i]
        }
        setWordSplitted([...result])
    }, [props.word])

    const checkGreen = (index: number) => {
        if (props.winningWord[index] === props.word[index]) {
            props.addGreenLetter(props.word[index])
            return true
        }
        return false
    }

    const checkYellow = (index: number) => {
        if (props.winningWord.indexOf(props.word[index]) !== -1) {
            props.addYellowLetter(props.word[index])
            return true
        }
        return false
    }

    return (
        <div className="wordRow">
            {wordSplitted.map((letter: string, index: number) => {
                if (props.isLastWord) {
                    return <Letter letter={letter} yellow={false} green={false} key={index} />
                }
                else {
                    return <Letter letter={letter} yellow={checkYellow(index)} green={checkGreen(index)} key={index} />
                }
            })}
        </div>
    )
}
export default Word