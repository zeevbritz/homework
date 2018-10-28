import React, { Component } from 'react';
import './displayRecipe.css';

class Recipe extends Component {
    state = {}
    render() {
        return (
            <div className= 'recipe'>
                <h1 className= 'name'>{this.props.recipe.name}</h1>
                <ul>Ingredients:<br/>{this.props.recipe.ingredients.map((ingredients, index) => <li key={index} >{ingredients}</li>)}</ul>
                <div className= 'directions'>Directions:<br/>{this.props.recipe.directions}</div>
            </div>
        );
    }
}

export default Recipe;