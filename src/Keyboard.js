import React from 'react'
import { letters } from './data/letters'
import Key from './Key'
import {FaBackspace, FaEraser} from 'react-icons/fa'

const Keyboard = ({presentLetters, correctLetters, absentLetters, handleSubmit, backspace, typeLetter}) => {
  return (
    <div className = "keyboard">
      <div className='key-row'>
        {letters.slice(0, 10).map(letter => (
          <Key 
            key={letter}
            letter={letter}
            typeLetter={typeLetter}
            isAbsent={absentLetters.includes(letter)}
            isPresent={presentLetters.includes(letter)}
            isCorrect={correctLetters.includes(letter)} />
        ))}
      </div>
      <div className='key-row'>
        {letters.slice(10, 19).map(letter => (
          <Key 
            key={letter}
            letter={letter}
            typeLetter={typeLetter}
            isAbsent={absentLetters.includes(letter)}
            isPresent={presentLetters.includes(letter)}
            isCorrect={correctLetters.includes(letter)} />
        ))}
      </div>
      
      <div className='key-row'>
        <div className='key enter default' onClick={()=>handleSubmit()}>ENTER</div>
        {letters.slice(19, 26).map(letter => (
          <Key 
            key={letter}
            letter={letter}
            typeLetter={typeLetter}
            isAbsent={absentLetters.includes(letter)}
            isPresent={presentLetters.includes(letter)}
            isCorrect={correctLetters.includes(letter)} />
        ))}
        <FaEraser className='key backspace default' type='button' onClick={()=>backspace()} />
      </div>
      
    </div>
  )
}

export default Keyboard
