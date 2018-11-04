import React, { Component } from 'react';
import './App.css';
import Form from './form';
import Weather from './weather';

class App extends Component {

  state = {
    zip: ''
  }

  fetchWeather = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=47d15dd6522572a23f6ce80a58cdf231&zip=${this.state.zip}&units=imperial`)
      .then(response => {
        return response.json()
      }).then(data => {
        this.setState({ currentZip: data })
      }
      )
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      currentZip: null
    });
  }

  handleSubmit = event => {
    this.fetchWeather();
    event.preventDefault();
  };


  render() {
    return (
      <div className="App">
        <Form zip={this.zip} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} fetchWeather={this.fetchWeather} />
        <hr />
        {this.state.currentZip ? <Weather zip={this.state.currentZip} /> : null}
      </div>
    );
  }
}

export default App;
