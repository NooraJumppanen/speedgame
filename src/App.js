import React, { Component } from 'react';
import './App.css';
import Circle from './Circle';
import {circles} from './circles.js';
import GameOver from './GameOver';

import startSound from "./assets/sounds/birds-isaiah658.ogg";
import endSound from "./assets/sounds/impactsplat01.mp3.flac";
import clickSound from "./assets/sounds/bubbles-single2.wav";

let gameEndSound = new Audio(endSound);
let gameStartSound = new Audio(startSound);
let gameClickSound = new Audio(clickSound);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class App extends Component {
  state = {
    score: 0,
    current: 0,
    gameOver: false,
    pace: 1500,
    rounds: 0,
    gameStart: false,
    gameStop: true,
  };

  timer = undefined;
  
  clickHandler = (id) => {
    gameClickSound.play();
    console.log('you clicked: ', id);

    if (this.state.current !== id){
      this.stopHandler();
      return;
    }

    this.setState({
      score: this.state.score + 10,
      rounds: 0,
    });
  };

  nextCircle = () => {
    if(this.state.rounds >= 5){
      this.stopHandler();
      return;
    }

    let nextActive; 
    
    do {
      nextActive = getRndInteger(1, 4)
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace); 

    console.log("active circle is ", this.state.current);
  };

  startHandler = () => {
    gameStartSound.play();
    this.nextCircle();
    this.setState({
      gameStart: true,
      gameStop: false,
    });
  };

  stopHandler = () => {
    gameStartSound.pause();
    gameEndSound.play();
    clearTimeout(this.timer);
    this.setState({
    gameOver: true,
    current: 0,
    gameStart: false,
    });
  };

  closeHandler = () => {
      this.setState({
      gameOver: false,
      score: 0,
      pace: 1500,
      rounds: 0,
      });
  };

  render() {
    return (
      <main>
        {this.state.gameOver && (<GameOver score={this.state.score} close={this.closeHandler} />)}
        <h1>Speedgame: Save the Plants!</h1>
        
        <h2>Your score: {this.state.score}</h2>

        <div className="circlewrapper">
        {circles.map((c) => (
        <Circle 
        key={c.id} 
        color={c.color} 
        id={c.id} 
        click={() => this.clickHandler(c.id)}
        active={this.state.current === c.id}
        disabled={this.state.gameStart}
        />))}
       </div>
      <div>
        <button disabled={this.state.gameStart} onClick={this.startHandler}>start</button>
        <button disabled={this.state.gameStop} onClick={this.stopHandler}>stop</button>
  
      </div>
      </main>

    );
  }
}

export default App;
