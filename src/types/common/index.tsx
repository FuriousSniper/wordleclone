export type WordResponse = {
    word: string,
    phonetic: string,
    audio?: string,
    sourceUrl: string[],
    meanings: Meaning[]
}

export type Meaning = {
    partOfSpeech: string,
    definitions: string[]
}

export type Score = {
    date: number,
    word: string,
    numberOfWords: number
}