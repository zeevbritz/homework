import { Component } from '@angular/core';
import { categories } from './shared/mock-categories';
import { Catagory } from './shared/catagory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  catagories = categories;

  catagory: Catagory;

  title = 'Best Kippah';

  onSelect(index: number): void {
    if (index >= 0) {
      // this.catagory = this.catagories.find(catagory=> catagory.name === name).items
      this.catagory = this.catagories[index];
    } else {
      this.catagory = null;
    }
  }
}
