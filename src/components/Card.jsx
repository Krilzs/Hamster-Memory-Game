import React from 'react'
import { useState } from 'react'
const Card = ( { card, handleScore} ) => {



  return (
    <div className="card" onClick={() => handleScore(card.id)}>
        <img src={card.src} alt={card.name} />
    </div>
  )
}

export default Card