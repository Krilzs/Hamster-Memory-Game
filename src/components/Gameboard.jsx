import React from 'react'
import { useState,useEffect } from 'react'
import Card from './Card'
import { fetchBoardCards } from './fetchImage';
import { use } from 'react';

function Gameboard() {
    const [connected, setConnected] = useState(false);
    const [board_cards, setBoard_cards] = useState([]);
    const [theme, setTheme] = useState('hamster');
    const [difficulty, setDifficulty] = useState(4);
    useEffect(() => {

        const fetchCards = async () => {
            const cards = await fetchBoardCards(theme, difficulty);
            setBoard_cards(cards);
            setConnected(true);
        }
        fetchCards();
    }, [theme, difficulty]);
    const [gameover, setGameover] = useState(false);
    const [score, setScore] = useState(0);
    const [max_score, setMax_score] = useState(0);
    const [flippedCards, setFlippedCards] = useState({});

    const handleScore = (id) => {
        if(!flippedCards[id] || score<=difficulty - 1){

            setFlippedCards({...flippedCards, [id]: true})
            setScore(score + 1)
        }
        else{   
            setFlippedCards({});
            setMax_score(score > max_score ? score : max_score);
            setScore(0);
            setDifficulty(difficulty + 2);
            setGameover(!gameover);
        }
    }

    function loading () {

        return(
            <>
                <h6>Loading Game</h6>
                <div className='dots'></div>
                <div className='dots'></div>
                <div className='dots'></div>
            </>
        )
    }

    const handleChangeTheme = (e) => {
        debugger;
        setTheme(e.target.value);
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
                <form >
                    <label htmlFor="theme">Select a theme</label>
                    <select name="Theme" id="theme" onChange={handleChangeTheme} placeholder="Theme">
                        <option value="hamster">Hamster</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="rabbit">Rabbit</option>
                    </select>
                </form>
            </div>
            <div className='cards-container'>
                {!connected ? loading() : ""}
            {board_cards.sort(()=> Math.random() - 0.5).map((card) => (
                <Card key={card.id} card={card} handleScore={handleScore}/>
            ))}
            </div>
            
        </article>
    )
}

export default Gameboard