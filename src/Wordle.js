import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Row from './Row'
import { letters, words } from './data/letters';
import Keyboard from './Keyboard';


const Wordle = () => {
  const [guesses, setGuesses] = useState(new Array(6).fill("     "));
  const [gameOver, setGameOver] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [noti, setNoti] = useState('')
  const [activeRow, setActiveRow] = useState(0)
  const [failed, setFailed] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [presentLetters, setPresentLetters] = useState([])
  const [absentLetters, setAbsentLetters] = useState([])
  const [notiId, setNotiId] = useState("default")
  const [SOLUTION, setSolution] = useState("")

  const resetGame = () => {
    setGuesses(new Array(6).fill("     "))
    setGameOver(false)
    setActiveIndex(0)
    setNoti('')
    setActiveRow(0)
    setFailed([])
    setCorrectLetters([])
    setPresentLetters([])
    setAbsentLetters([])
    setNotiId("default")
    fetchSolution()
  }
  const fetchSolution = async () => {
    const SOL = words[Math.floor(Math.random() * words.length)]
    console.log(SOL);
    setSolution(SOL)
  }
  useEffect(() => {
    fetchSolution();
  }, [])

  const wordleRef = useRef();
  useEffect(() => {
    wordleRef.current.focus();
  })

  const replaceCharacter = (string, index, replacement) => {
    return string.slice(0, index) + replacement + string.slice(index + replacement.length)
  }
  const typeLetter = (letter) => {
    if (activeIndex < 5) {
      setNoti('')
      let newGuesses = [...guesses]
      newGuesses[activeRow] = replaceCharacter(newGuesses[activeRow], activeIndex, letter)
      setGuesses(newGuesses)
      setActiveIndex(index => index+1)
      setNotiId("default")
    }
  }
  const handleSubmit = () => {
    if (!words.includes(guesses[activeRow])) {
      setNoti("Not in word list")
      setActiveIndex(0)
      setNotiId("error")
      let newGuesses = [...guesses]
      newGuesses[activeRow] = '     '
      setGuesses(newGuesses)
    }
    else if (activeIndex === 5) {
      const currentGuess = guesses[activeRow]
      if (failed.includes(currentGuess)) {
        setNoti("Tried already")
        setActiveIndex(0)
        setNotiId("error")
        let newGuesses = [...guesses]
        newGuesses[activeRow] = '     '
        setGuesses(newGuesses)
      } else if (currentGuess === SOLUTION) {
        setGameOver(true)
        setNoti("Correct")
        setCorrectLetters([...SOLUTION])
        setNotiId("correct")
      }else if (activeRow>=5) {
        setNoti("Game over.")
        setGameOver(true)
        setNotiId("error")
      } else {
        let correctGuess = [...correctLetters];
        [...currentGuess].forEach((letter, index) => {
          if (SOLUTION[index] === letter) correctGuess.push(letter)
        });
        
        setCorrectLetters([...new Set(correctGuess)]);

        let presentGuess = [...presentLetters, ...[...currentGuess].filter(letter =>SOLUTION.includes(letter))]
        setPresentLetters([...new Set(presentGuess)])
        

        let absentGuess = [...absentLetters, ...[...currentGuess].filter(letter => !SOLUTION.includes(letter))]
        setAbsentLetters([...new Set(absentGuess)])

        setFailed([...failed, currentGuess])
        setActiveRow(index => index + 1)
        setActiveIndex(0)
        setNotiId("default")
      }
    }
    
  }
  

  const backspace = () => {
    if (activeIndex===0) return;
    let newGuesses = [...guesses]
    newGuesses[activeRow] = replaceCharacter(newGuesses[activeRow], activeIndex-1, ' ')
    setGuesses(newGuesses)
    setActiveIndex(activeIndex => activeIndex-1)
  }

  const handleKeydown = (e) => {
    if (gameOver) return;

    if (letters.includes(e.key)) {
      typeLetter(e.key)
      return;
    }
    
    if (e.key === "Enter") {
      handleSubmit()
      return;
    }

    if (e.key === 'Backspace') {
      backspace()
      return;
    }
  }
  
  return (
    <div className='wordle' ref={wordleRef} tabIndex="0" onBlur={e=>e.target.focus} onKeyDown={handleKeydown}>
      <div className='noti' id={notiId}>{noti}</div>
      {guesses.map((guess, i) => (
        <Row 
          key={i} 
          guess={guess}
          solution = {SOLUTION}
          activeRow = {activeRow > i || gameOver && activeRow === i} />
      ))}
    <div className='solution'>{gameOver && SOLUTION}</div>
    
    {gameOver?  
      <button className="reset play" onClick={resetGame}>Play again</button>
      : <button className="reset reset-but" onClick={resetGame}>Reset</button>
    }
    
    <Keyboard 
       presentLetters={presentLetters}
       absentLetters={absentLetters}
       correctLetters={correctLetters}
       typeLetter={typeLetter}
       handleSubmit={handleSubmit}
       backspace={backspace} />
    </div>
  )
}

export default Wordle
