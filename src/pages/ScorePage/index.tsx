import { useEffect, useState } from "react"
import { Score } from "../../types/common"
import { getScores } from "../../utils"
import "./style.less"
import Histogram from "../../components/Histogram"
import Header from "../../components/Header"
import useTitle from "../../hooks/useTitle"

const ScorePage = () => {
    const [scores, setScores] = useState<Array<Score>>(getScores())
    const [histogram, setHistogram] = useState<Map<number, number>>(new Map<number, number>())
    useTitle("Wordle - scores")

    useEffect(() => {
        createHistogram()
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

    return (
        <div className="App autoOverflow">
            <Header />
            <h1>Scores</h1>
            <div className="scoreColumn">
                <div className="singleScore">
                    {
                        <>
                            <span>Total number of games: {scores.length}</span>
                            {scores.length > 0 &&
                                <span>Mean of words needed to guess: {((scores.reduce((accumulator: number, current: Score) => accumulator + current.numberOfWords, 0)) / scores.length).toFixed(3)}</span>
                            }
                        </>
                    }
                </div>
                {scores.length > 0 &&
                    <div className="singleScore">
                        <Histogram histogram={histogram} />
                    </div>
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