import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayWeatherComponent } from './display-weather/display-weather.component';
import { FiveDayForecastComponent } from './five-day-forecast/five-day-forecast.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{
  path: 'weather',
  component: DisplayWeatherComponent
}, {
  path: '5day',
  component: FiveDayForecastComponent
}, {
  path: '',
  redirectTo: 'weather',
  pathMatch: 'full'
}, {
  path: '**',
  component: PageNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
