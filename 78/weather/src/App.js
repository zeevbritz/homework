import React, { Component } from 'react';
import './App.css';
import Form from './form';
import Weather from './weather';

class App extends Component {

  state = {
    zip: ''
  }

  fetchWeather = event => {
    event.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=47d15dd6522572a23f6ce80a58cdf231&zip=${this.state.zip}&units=imperial`)
      .then(response => {
        if (response.status === 404) {
          alert('404 (Not Found)')
          window.location.reload(true);
        } else {
          return response.json()
        }
      }).then(data => {
        this.setState({ weatherData: data })
      }
      )
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      weatherData: null
    });
  }

  render() {
    return (
      <div className="App">
        <Form zip={this.state.zip} handleInputChange={this.handleInputChange} handleSubmit={this.fetchWeather} />
        <hr />
        {this.state.weatherData ? <Weather weatherData={this.state.weatherData} /> : null}
      </div>
    );
  }
}

export default App;
