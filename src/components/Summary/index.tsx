import axios from 'axios'
import "./style.less"
import { useEffect, useState } from 'react'
import { Meaning, WordResponse } from '../../types/common'
import { Link } from 'react-router-dom'

interface SummaryProps {
    winningWord: string,
    isGameWon: boolean,
    resetGame: () => void
}

const Summary = (props: SummaryProps) => {
    const [isError, setIsError] = useState(false)
    const [wordResult, setWordResult] = useState({} as WordResponse)

    useEffect(() => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.winningWord}`)
            .then(function (response) {
                let obj: WordResponse = {} as WordResponse
                const data = response.data[0]
                obj['word'] = data.word
                obj['phonetic'] = data.phonetic
                obj['audio'] = undefined
                for (var i = 0; i < data.phonetics.length; i++) {
                    if (data.phonetics[i].audio !== "") {
                        obj['audio'] = data.phonetics[i].audio
                        break
                    }
                }
                obj['sourceUrl'] = data.sourceUrls
                obj['meanings'] = new Array<Meaning>()
                for (var i = 0; i < data.meanings.length; i++) {
                    let meaning = {} as Meaning
                    meaning['partOfSpeech'] = data.meanings[i].partOfSpeech
                    meaning['definitions'] = new Array<string>()
                    for (var j = 0; j < data.meanings[i].definitions.length; j++) {
                        meaning['definitions'].push(data.meanings[i].definitions[j].definition)
                    }

                    obj['meanings'].push(meaning)
                }
                setWordResult(obj)
                setIsError(false)
            })
            .catch(() => {
                setIsError(true)
            })
    }, [])

    return (
        <div className="summary">
            <h3>
                {props.isGameWon &&
                    <span>Congrats! You guessed the word! 🎉</span>
                }
                {
                    !props.isGameWon &&
                    <span>Better luck next time! 🐱‍👓</span>
                }
            </h3>
            <div className="details">
                <div className="detailsRow centered">
                    <button type='button' onClick={()=>props.resetGame()} className='playAgainButton'>Play again</button>
                    <Link to="/scores"><button type='button' className='playAgainButton'>Scores</button></Link>
                </div>
                <div className="detailsRow">
                    <span>Word to guess:</span>
                    <span>{props.winningWord}</span>
                </div>
                {
                    !isError &&
                    <>
                        {
                            wordResult.phonetic !== undefined &&
                            <div className="detailsRow">
                                <span>Phonetics:</span>
                                <span>{wordResult.phonetic}</span>
                            </div>
                        }
                        {
                            wordResult.audio !== undefined &&
                            <div className="detailsRow">
                                <span>Audio:</span>
                                <audio controls>
                                    <source src={wordResult.audio} />
                                </audio>
                            </div>
                        }
                        {
                            wordResult.sourceUrl?.map((link: string, key) => {
                                return (
                                    <div className="detailsRow" key={key}>
                                        <span>Dictionary link:</span>
                                        <a href={link} target="_blank" rel="noopener noreferrer">Link</a>
                                    </div>
                                )
                            })
                        }
                        {wordResult.meanings?.map((m: Meaning, key) => {
                            return (
                                <>
                                    {
                                        <div className="detailsRow" key={key}>
                                            <span>Part of speech:</span>
                                            <span>{m.partOfSpeech}</span>
                                        </div>
                                    }
                                    {
                                        m.definitions.map((definition: string, key) => {
                                            return (
                                                <div className="detailsRow leftPadded" key={key}>
                                                    {definition}
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            )
                        })}
                    </>
                }
                {
                    isError &&
                    <span>There was an error processing details 😢</span>
                }
            </div>
        </div>
    )
}

export default Summary