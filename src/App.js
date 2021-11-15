import React, { Component } from 'react';
import './App.css';
import Circle from './Circle';
import {circles} from './circles.js';


class App extends Component {
  state = {}
  render() {
    return (
      <main>
        <h1>Speedgame</h1>
        <h2>Your score: <span className="scorearea"></span></h2>

        <div className="circlewrapper">
        {circles.map((c) => (<Circle key={c.id} color={c.color} id={c.id}/>))}
       </div>
      <div>
        <button>start</button>
        <button>stop</button>
      </div>
      </main>

    );
  }
}

export default App;
