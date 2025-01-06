import { Score } from "../types/common";
import words from "./words";

export const getRandomWord = (): string =>{
    const minCeiled = Math.ceil(0);
    const maxFloored = Math.floor(words.length-1);
    return words[Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)]
}

export const setToLS = (key: string, value: string) => localStorage.setItem(key, value);

export const getFromLS = (key: string): string | null => {
    return localStorage.getItem(key)
}

export const scoresKey="LS_SCORES"

export const saveScore = (score: Score): void =>{
    const scoresLs = getFromLS(scoresKey)
    if(!scoresLs){
        setToLS(scoresKey,JSON.stringify([]))
        return
    }
    let scoreArray;
    try{
        scoreArray = JSON.parse(scoresLs)
    }
    catch(e){
        return
    }

    scoreArray.push(score)
    setToLS(scoresKey,JSON.stringify(scoreArray))
}

export const getScores = (): Array<Score> =>{
    const scoresLs = getFromLS(scoresKey)
    if(!scoresLs){
        return []
    }

    let scoreArray = new Array<Score>();
    try{
        scoreArray = JSON.parse(scoresLs)
    }
    catch(e){
        return []
    }

    return scoreArray
}