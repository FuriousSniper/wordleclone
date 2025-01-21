import './style.less'
import WordBoard from "../../components/WordBoard";
import { useEffect, useState } from "react";
import Keyboard from '../../components/Keyboard';
import axios from 'axios'
import { getRandomWord, saveScore } from '../../utils';
import Summary from '../../components/Summary';
import toast from 'react-hot-toast';
import Header from '../../components/Header';
import useTitle from '../../hooks/useTitle';
import Drawer from '../../components/Drawer';

const GamePage = () => {
    const [wordsArray, setWordsArray] = useState<string[]>(Array<string>(6).fill(""))
    const [isGameEnded, setIsGameEnded] = useState(false)
    const [isGameWon, setIsGameWon] = useState<boolean | undefined>(undefined)
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [winningWord, setWinningWord] = useState(getRandomWord())
    const [greenLetters, setGreenLetters] = useState<string[]>(Array<string>())
    const [yellowLetters, setYellowLetters] = useState<string[]>(Array<string>())
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    useTitle("Wordle - game")

    useEffect(() => {
        window.addEventListener('keydown', handleKeyboardInput)

        return () => {
            window.removeEventListener('keydown', handleKeyboardInput)
        }
    })

    const handleKeyboardInput = (e: KeyboardEvent) => {
        if (isGameEnded || isDrawerOpen) {
            return
        }

        if (!(/^[a-zA-Z]$/.test(e.key)) && e.key !== "Backspace" && e.key !== "Enter") {
            return
        }

        if (e.key === "Backspace") {
            e.preventDefault()
        }

        mutateWord(e.key)
    }

    const mutateWord = async (keyName: string) => {
        if (isGameEnded) {
            return
        }

        let lastWord = wordsArray[currentWordIndex]
        if (keyName === "Enter" && lastWord.length === 5) {
            let isCorrectWord = true
            await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${lastWord}`)
                .then(function () {
                    isCorrectWord = true
                })
                .catch(function () {
                    isCorrectWord = false
                })
                .finally(function () {
                });

            if (!isCorrectWord) {
                toast.error('The word does not exist');
                return
            }

            if (lastWord === winningWord) {
                setIsGameWon(true)
                setIsGameEnded(true)
                saveScore({
                    date: Date.now(),
                    word: winningWord,
                    numberOfWords: currentWordIndex + 1
                })
                setCurrentWordIndex(currentWordIndex + 1)
                toast.success('You guessed the word! 🎉');
            }
            else {
                setCurrentWordIndex(currentWordIndex + 1)
                if (currentWordIndex + 1 >= 6) {
                    setIsGameEnded(true)
                    setIsGameWon(false)
                    saveScore({
                        date: Date.now(),
                        word: winningWord,
                        numberOfWords: currentWordIndex + 2
                    })
                    toast.error('Better luck next time!');
                }
            }
        }

        if (keyName === "Backspace" && lastWord.length > 0) {
            lastWord = lastWord.substring(0, lastWord.length - 1);
        }

        if (/^[a-zA-Z]$/.test(keyName) && lastWord.length < 5) {
            lastWord += keyName.toLowerCase()
        }

        let newWordsArray = [...wordsArray]
        newWordsArray[currentWordIndex] = lastWord
        setWordsArray([...newWordsArray])
    }

    const addGreenLetter = (letter: string) => {
        if (!greenLetters.includes(letter)) {
            setGreenLetters([letter, ...greenLetters])
        }
    }

    const addYellowLetter = (letter: string) => {
        if (!yellowLetters.includes(letter)) {
            setYellowLetters([...yellowLetters, letter])
        }
    }

    const resetGame = () => {
        setWordsArray(Array<string>(6).fill(""))
        setIsGameEnded(false)
        setIsGameWon(false)
        setCurrentWordIndex(0)
        setWinningWord(getRandomWord())
        setGreenLetters(Array<string>())
        setYellowLetters(Array<string>())
    }

    const closeDrawer = () =>{
        setIsDrawerOpen(false)
    }

    return (
        <div className="App">
            <Header />
            <h1>Wordle</h1>
            <div className="gameColumn">
                <WordBoard words={wordsArray} currentWordIndex={currentWordIndex} winningWord={winningWord} isGameEnded={isGameEnded} addGreenLetter={addGreenLetter} addYellowLetter={addYellowLetter} />
                <Keyboard keyPressFunction={mutateWord} currentWordIndex={currentWordIndex} words={wordsArray} isGameEnded={isGameEnded} greenLetters={greenLetters} yellowLetters={yellowLetters} isDrawerOpen={isDrawerOpen}/>
                {
                    isGameEnded &&
                    <Summary winningWord={winningWord} isGameWon={isGameWon ?? false} resetGame={resetGame} />
                }
                <div className="wrapper">
                    <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className='drawerButton buttonClass'>Open favorite words</button>
                </div>
                <Drawer isOpen={isDrawerOpen} closeDrawer={closeDrawer}/>
            </div>
        </div>
    )
}

export default GamePage;