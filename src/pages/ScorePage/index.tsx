import { useEffect, useState } from "react"
import { Score } from "../../types/common"
import { getScores, resetScores } from "../../utils"
import "./style.less"
import Histogram from "../../components/Histogram"
import Header from "../../components/Header"
import useTitle from "../../hooks/useTitle"
import ScoreTile from "../../components/ScoreTile"

const ScorePage = () => {
    const [scores, setScores] = useState<Array<Score>>(getScores())
    const [histogram, setHistogram] = useState<Map<number, number>>(new Map<number, number>())
    const [countWonGames, setCountWonGames] = useState(0)
    const [countFirstWordWins, setCountFirstWordWins] = useState(0)
    useTitle("Wordle - scores")

    useEffect(() => {
        createHistogram()
        let gamesWon = 0
        let firstWords = 0
        for (var i = 0; i < scores.length; i++) {
            if (scores[i].numberOfWords < 7) {
                gamesWon++
            }
            if (scores[i].numberOfWords === 1) {
                firstWords++
            }
        }
        setCountWonGames(gamesWon)
        setCountFirstWordWins(firstWords)
    }, [scores])

    const printDates = (dateNumber: number) => {
        var date = new Date(dateNumber);
        const dmy = date.toLocaleDateString("en-GB");
        const hms = date.toLocaleTimeString("it-IT");
        return <>{dmy} {hms}</>
    }

    const createHistogram = () => {
        const h = new Map<number, number>()
        for (var i = 0; i < 7; i++) {
            h.set(i + 1, 0)
        }
        for (const score of scores) {
            h.set(score.numberOfWords, h.get(score.numberOfWords)! + 1)
        }
        setHistogram(h)
    }

    const resetStats = () => {
        resetScores()
        setScores([])
    }

    return (
        <div className="App autoOverflow">
            <Header />
            <h1>Scores</h1>
            <div className="scoreColumn">
                <div className="singleScore">
                    {
                        <>
                            <ScoreTile scoreNumber={scores.length} scoreTitle={"Total number of games"} />
                            {scores.length > 0 &&
                                <ScoreTile scoreNumber={((scores.reduce((accumulator: number, current: Score) => accumulator + current.numberOfWords, 0)) / scores.length).toFixed(3)} scoreTitle={"Mean of words needed to guess"} />
                            }
                        </>
                    }
                </div>
                <div className="singleScore">
                    {
                        <>
                            {scores.length > 0 &&
                                <>
                                    <ScoreTile scoreNumber={countWonGames} scoreTitle={"Games won"} />
                                    <ScoreTile scoreNumber={countFirstWordWins} scoreTitle={"Games won with 1st word"} />
                                </>
                            }
                        </>
                    }
                </div>
                {scores.length > 0 &&
                    <>
                        <div className="singleScore">
                            <Histogram histogram={histogram} />
                        </div>
                        <div className="singleScore">
                            <button onClick={resetStats} className="buttonClass">Reset stats</button>
                        </div>
                    </>
                }
                {
                    scores.map((s: Score, key) => {
                        return (
                            <div className="singleScore" key={key}>
                                <span>{printDates(s.date)}</span>
                                <span>Word: {s.word}</span>
                                <span>Score: {s.numberOfWords}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ScorePage