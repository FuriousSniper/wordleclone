import KeyboardButton from "../KeyboardButton"
import './style.less'

interface KeyboardProps {
    keyPressFunction: (keyName: string) => void,
    currentWordIndex: number,
    words: string[],
    isGameEnded: boolean,
    greenLetters: string[],
    yellowLetters: string[],
    isDrawerOpen: boolean
}

const Keyboard = (props: KeyboardProps) => {
    const row1 = "qwertyuiop"
    const row2 = "asdfghjkl"
    const row3 = "zxcvbnm"

    const buttonClick = (keyName: string) => {
        if(props.isGameEnded || props.isDrawerOpen){
            return
        }
        props.keyPressFunction(keyName)
    }

    const isLetterYellow = (keyName: string) =>{
        return props.yellowLetters.includes(keyName) ? true : false
    }

    const isLetterGreen= (keyName: string) =>{
        return props.greenLetters.includes(keyName) ? true : false
    }

    return (
        <div className="keyboard">
            <div className="keyRow">
                {row1.split("").map((keyName: string, index: number) => {
                    return <KeyboardButton keyName={keyName} clickFunction={buttonClick} key={index} isYellow={isLetterYellow(keyName)} isGreen={isLetterGreen(keyName)}/>
                })}
            </div>
            <div className="keyRow">
                {row2.split("").map((keyName: string, index: number) => {
                    return <KeyboardButton keyName={keyName} clickFunction={buttonClick} key={index} isYellow={isLetterYellow(keyName)} isGreen={isLetterGreen(keyName)}/>
                })}
            </div>
            <div className="keyRow">
                <KeyboardButton keyName={"Enter"} clickFunction={buttonClick}/>
                {row3.split("").map((keyName: string, index: number) => {
                    return <KeyboardButton keyName={keyName} clickFunction={buttonClick} key={index} isYellow={isLetterYellow(keyName)} isGreen={isLetterGreen(keyName)}/>
                })}
                <KeyboardButton keyName={"Backspace"} clickFunction={buttonClick} displayName="⌫"/>
            </div>
        </div>
    )
}
export default Keyboard