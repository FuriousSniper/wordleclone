import './style.less'

interface ScoreTileProps{
    scoreNumber: number | string,
    scoreTitle: string
}
const ScoreTile = (props: ScoreTileProps)=>{
    return(
        <div className='scoreTile'>
            <span className='scoreNumber'>{props.scoreNumber}</span>
            <span className='scoreText'>{props.scoreTitle}</span>
        </div>
    )
}

export default ScoreTile