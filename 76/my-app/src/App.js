import React, { Component } from 'react';
import './App.css';
import Clock from './clock';
import Student from './student';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Clock />
        <Student name="Zeev Britz" add="461 Ridge Ave" />
        <Student name="Chaim Menachem Britz" add="461 Ridge Ave" />
      </div>
    );
  }
}

export default App;
