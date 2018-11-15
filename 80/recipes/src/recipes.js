import React, { Component } from 'react';
import RecipeArray from './recipeArray.js';
import { Link } from 'react-router-dom';

class Recipes extends Component {
    state = {}

    getRecipesList() {
        return RecipeArray.map(recipe =>
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <h3 >{recipe.name}</h3>
            </Link>)
    }

    render() {
        return (this.getRecipesList());
    }
}

export default Recipes;