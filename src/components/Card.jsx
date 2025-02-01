import React from 'react'
import { useState } from 'react'
const Card = ( { card, handleScore} ) => {



  return (
    <div className="card" onClick={() => handleScore(card.id)}>
        <img src={card.src} alt={card.name} />
        <h2>{card.name}</h2>
    </div>
  )
}

export default Card