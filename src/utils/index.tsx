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
        setToLS(scoresKey,JSON.stringify([score]))
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

export const resetScores = () =>{
    setToLS(scoresKey,JSON.stringify([]))
}

export const favWordsKey="LS_F_WORDS"

export const saveFavWord = (word: string): void =>{
    const wordsLs = getFromLS(favWordsKey)
    if(!wordsLs){
        setToLS(favWordsKey,JSON.stringify([word]))
        return
    }
    let wordArray;

    try{
        wordArray = JSON.parse(wordsLs)
    }
    catch(e){
        return
    }

    wordArray.push(word)
    setToLS(favWordsKey,JSON.stringify(wordArray))
}

export const replaceFavWords = (wordArray: Array<string>): void=>{
    setToLS(favWordsKey,JSON.stringify(wordArray))
}

export const getFavWords = (): Array<string>=>{
    const wordsLs = getFromLS(favWordsKey)
    if(!wordsLs){
        return []
    }

    let wordsArray = new Array<string>();
    try{
        wordsArray = JSON.parse(wordsLs)
    }
    catch(e){
        return []
    }

    return wordsArray
}