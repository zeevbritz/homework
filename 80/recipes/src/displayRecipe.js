import React, { Component } from 'react';
import './displayRecipe.css';
import RecipeArray from './recipeArray.js';

class Recipe extends Component {
    state = {}

    render() {
        const recipe = RecipeArray.find(obj => obj.id === parseInt(this.props.match.params.recipeId));
        return (
            <div className='recipe'>
                <h1 className='name'>{recipe.name}</h1>
                <ul>Ingredients:<br />{recipe.ingredients.map((ingredients, index) => <li key={index} >{ingredients}</li>)}</ul>
                <div className='directions'>Directions:<br />{recipe.directions}</div>
            </div>
        );
    }
}

export default Recipe;