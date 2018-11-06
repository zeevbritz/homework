import React, { Component } from 'react';

class Weather extends Component {


    render() {
        return (
            <>
                <h2>The weather in {this.props.weatherData.name} is</h2>
                <img src={`http://openweathermap.org/img/w/${this.props.weatherData.weather[0].icon}.png`} alt="weather icon" />
                <h2>{Math.floor(this.props.weatherData.main.temp)}&#8457; and {this.props.weatherData.weather[0].description}</h2>
            </>);
    }
}

export default Weather;