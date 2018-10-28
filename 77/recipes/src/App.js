import React, { Component } from 'react';
import './App.css';
import Recipes from './recipes';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>ZB's Recipes</h1>
          <Recipes/>
        </header>
      </div>
    );
  }
}

export default App;
