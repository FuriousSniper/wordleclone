import { useEffect, useState } from "react"
import './style.less'

interface HistogramProps {
    histogram: Map<number, number>,
}
const Histogram = (props: HistogramProps) => {
    const [nrOfGames, setNrOfGames] = useState(0)
    const [maxValue, setMaxValue] = useState(0)

    const sumScores = (h: Map<number, number>) => {
        if (h === undefined) {
            return 0
        }
        let sum = 0;
        for (const [key, value] of h) {
            sum += value
        }
        return sum
    }

    useEffect(() => {
        setNrOfGames(sumScores(props.histogram))

        let max = 0;
        for (const [key, value] of props.histogram) {
            if (value > max) {
                max = value
            }
        }
        setMaxValue(max)
    }, [props.histogram])

    const determineColor = (value: number) => {
        if (value === 0) {
            return "greyBar"
        }
        else if (value === maxValue) {
            return "greenBar"
        }
        else {
            return "yellowBar"
        }
    }

    return (
        <div className="histogramWrapper">
            <h3>Guess distribution</h3>
            {
                Array.from(props.histogram.entries()).map(([key, value]) => {
                    return (
                        <div className="rowWrapper">
                            <span>#{key}</span>
                            <div className={`histBar ${determineColor(value)}`} style={{ width: ((value / nrOfGames) * 100) + "%" }}>
                                {((value / nrOfGames) * 100).toFixed(0)}%
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Histogram