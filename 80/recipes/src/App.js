import React, { Component } from 'react';
import './App.css';
import Recipes from './recipes';
import Recipe from './displayRecipe';
import addRecipe from './addRecipe';
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ZB's Recipes</h1>
        <NavLink exact to="/recipes">Recipes</NavLink> | <NavLink exact to="/addRecipe">Add your Recipe</NavLink>
        <hr />
        <Switch>
          <Route path="/recipes" component={Recipes} />
          <Route path="/recipe/:recipeId" component={Recipe} />
          <Route path="/addRecipe" component={addRecipe} />
          <Redirect exact from="/" to="/recipes" />
          <Route render={() => <h1 style={{ color: 'red' }}>No such page</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;