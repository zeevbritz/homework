import { Component, Input } from '@angular/core';
import { Person } from './shared/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myHomeworkApp';

  // thePerson: Person = {
  //   firstName: 'Zevi',
  //   lastName: 'Britz',
  //   street: '461 Ridge Ave',
  //   city: 'Lakewood',
  //   state: 'nj',
  //   zip : '08701'
  // };

  thePerson: Person = {
    firstName: 'Zevi',
    lastName: 'Britz',
    address: {
      street: '461 Ridge Ave',
      city: 'Lakewood',
      state: 'nj',
      zip: '08701'
    }
  }


}
