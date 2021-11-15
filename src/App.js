import React, { Component } from 'react';
import './App.css';
import Circle from './Circle';
import {circles} from './circles.js';

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

class App extends Component {
  state = {
    score: 0,
    current: 0,
  };

  timer = undefined;
  pace = 1500;

  clickHandler = () => {
    this.setState({
      score: this.state.score + 10,
    });
  };

  nextCircle = () => {
    let nextActive; 
    
    do {
      nextActive = getRndInteger(1, 4)
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
    });
    this.pace *= 0.95;
    this.timer = setTimeout(this.nextCircle, this.pace); 

    console.log("active circle is ", this.state.current);
  };

  startHandler = () => {
    this.nextCircle();

  };

  stopHandler = () => {
    clearTimeout(this.timer);

  };

  render() {
    return (
      <main>
        <h1>Speedgame</h1>
        <h2>Your score: {this.state.score}</h2>

        <div className="circlewrapper">
        {circles.map((c) => (
        <Circle 
        key={c.id} 
        color={c.color} 
        id={c.id} 
        click={this.clickHandler}
        />))}
       </div>
      <div>
        <button onClick={this.startHandler}>start</button>
        <button onClick={this.stopHandler}>stop</button>
  
      </div>
      </main>

    );
  }
}

export default App;
