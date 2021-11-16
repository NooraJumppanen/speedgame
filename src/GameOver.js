import React from 'react';

const GameOver = (props) => {
    return (
        <>
        <div className="overlay"></div>
        <div className="popup">
        <button className="closebutton" onClick={props.close}>X</button>
        <h2>Game Over!</h2>
        <p>Your score was: {props.score}</p>
        </div>
        </>
    );
};

export default GameOver;