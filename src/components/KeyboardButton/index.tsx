import './style.less'

interface KeyboardButtonProps{
    clickFunction: (keyName: string)=> void,
    keyName: string,
    displayName?: string,
    isYellow?: boolean,
    isGreen?: boolean,
}

const KeyboardButton = (props: KeyboardButtonProps) =>{
    const buttonClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        props.clickFunction(props.keyName)
    }
    return(
        <div onClick={buttonClick} className={`keyboardButton ${props.isGreen ? "greenButton" : ""} ${props.isYellow ? "yellowButton" : ""}`}>
            {props.displayName ?? props.keyName}
        </div>
    )
}

export default KeyboardButton