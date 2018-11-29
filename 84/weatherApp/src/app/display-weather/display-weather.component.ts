import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Observable, Subscription } from 'rxjs';
import { Weather } from '../shared/weather';

@Component({
  selector: 'app-display-weather',
  templateUrl: './display-weather.component.html',
  styleUrls: ['./display-weather.component.css']
})
export class DisplayWeatherComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }

  subscription: Subscription;
  weather: Weather;

  getWeather(zip: string) {
    if (!zip) {
      return;
    }
    this.subscription = this.weatherService.getWeather(zip)
      .subscribe(data => {
        this.weather = data;
      }, err => {
        // this.weather = err;
        alert(`${err.status} ${err.statusText}`)
        window.location.reload(true);
      })
  }

  ngOnInit() {
    // this.subscription = this.weatherService.getWeather()
    // .subscribe(data => {
    //   this.weather = data;
    // }, err => {
    //   this.weather = err;
    // })
  }

}
