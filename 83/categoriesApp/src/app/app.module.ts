import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DisplayItemsComponent } from './display-items/display-items.component';
import { DisplayCategoriesComponent } from './display-categories/display-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayItemsComponent,
    DisplayCategoriesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
