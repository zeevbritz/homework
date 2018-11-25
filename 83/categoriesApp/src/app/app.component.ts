import { Component } from '@angular/core';
import { categories } from './shared/mock-categories';
import { Category } from './shared/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categories = categories;

  category: Category;

  showCategories = false;

  title = 'Best Kippah';

  onSelect(index: number): void {
    this.showCategories = false;
    if (index >= 0) {
      // this.catagory = this.catagories.find(catagory=> catagory.name === name).items
      this.category = this.categories[index];
    } else {
      this.category = null;
    }
  }
  onClick(){
    this.showCategories =!this.showCategories;
  }
}
