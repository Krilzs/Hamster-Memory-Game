import React from 'react'
import { useState,useEffect } from 'react'
import Card from './Card'
import { fetchBoardCards } from './fetchImage';
import { use } from 'react';

function Gameboard() {

    const [board_cards, setBoard_cards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const cards = await fetchBoardCards();
            setBoard_cards(cards);
        }
        fetchCards();
    }, []);
    const [gameover, setGameover] = useState(false);
    const [score, setScore] = useState(0);
    const [max_score, setMax_score] = useState(0);
    const [flippedCards, setFlippedCards] = useState({});

    const handleScore = (id) => {

        if(!flippedCards[id]){
            setFlippedCards({...flippedCards, [id]: true})
            setScore(score + 1)
        }
        else{
            setFlippedCards({});
            setMax_score(score > max_score ? score : max_score);
            setScore(0);
            setGameover(!gameover);
        }
        
    }





    return (
        <article className="gameboard">
            <div className='gameboard-header'>
                <span>
                    <h2>The Memory Game</h2>
                    <p>Click on a card to start, when you click on the same card you lose</p>
                </span>
                <span>
                    <h4>Score: {score}</h4>
                        <h4>Best: {max_score}</h4>
                </span>
            </div>
            <div className='cards-container'>
            {board_cards.sort(()=> Math.random() - 0.5).map((card) => (
                <Card key={card.id} card={card} handleScore={handleScore}/>
            ))}
            </div>
            
        </article>
    )
}

export default Gameboard