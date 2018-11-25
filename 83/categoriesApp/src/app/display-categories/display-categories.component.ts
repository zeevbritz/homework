import { Component, OnInit } from '@angular/core';
import { categories } from '../shared/mock-categories';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.css']
})
export class DisplayCategoriesComponent implements OnInit {

  categories = categories;

  onDelete(index: number): void {
    if(window.confirm('Are you sure you want to Delete this category?')){
      categories.splice(index, 1);
    }    
  }

  onAdd(name){
    categories.push({name:name, items:[]});    
  }

  constructor() { }

  ngOnInit() {
  }

}
