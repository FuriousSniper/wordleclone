import './style.less'

interface LetterProps{
    letter?: string,
    yellow?: boolean,
    green?: boolean
}
const Letter = (props: LetterProps) =>{    
    return (
        <div className={`letter ${props.green===true? "letterGreen" : ""} ${props.yellow===true? "letterYellow" : ""}`}>
            {props.letter}
        </div>
    )
}

export default Letter;