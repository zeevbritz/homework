import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../shared/category';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements OnInit {
  @Input()
  selectedCategory: Category;

  onDelete(index: number): void {
    if(window.confirm('Are you sure you want to Delete this item?')){
      this.selectedCategory.items.splice(index, 1);
    }    
  }

  onAdd(name, price){
    this.selectedCategory.items.push({name:name, price:price});    
  }
  
  constructor() { }

  ngOnInit() {
  }

}
