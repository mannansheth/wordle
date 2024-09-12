import React from 'react'

const Key = ({letter, typeLetter, isAbsent, isPresent, isCorrect}) => {
  return (
    <div className={`key ${isCorrect ? "correct" : isPresent ? "present" : isAbsent ? "absent" : "default"}`} onClick={()=>typeLetter(letter)}>
      {letter.toUpperCase()}
    </div>
  )
}

export default Key
