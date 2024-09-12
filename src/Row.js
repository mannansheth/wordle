import React from 'react'

const Row = ({guess, solution, activeRow}) => {
  const highlighted = []
  return (
    <div className='row'>
      {guess.split("").map((letter, i) => {
        let bgClass;
        if (solution[i] === letter) {
          highlighted.push(letter)
          bgClass="correct"
        } else if (solution.includes(letter) && !highlighted.includes(letter)) {
          bgClass="present"
          highlighted.push(letter)
          

        } else {
          bgClass="absent"
        }
        
        return (
          <div className={`letter ${activeRow && `${bgClass}`} `} key={i} >{letter}</div>
        )
      })}
      
    </div>
  );
}

export default Row