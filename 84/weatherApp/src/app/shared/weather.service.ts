import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Weather } from './weather';

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: [{ description: string, icon: string }];
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather(zip: string): Observable<Weather> {
    return this.httpClient.get<WeatherData>(`http://api.openweathermap.org/data/2.5/weather?APPID=47d15dd6522572a23f6ce80a58cdf231&zip=${zip}&units=imperial`)
      .pipe(map(data => ({
        name: data.name,
        temp: Math.floor(data.main.temp),
        img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        description: data.weather[0].description
      })
      ))
  }
}
