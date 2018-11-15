import React, { Component } from 'react';
import RecipeArray from './recipeArray.js';
import './addRecipe.css';

class addRecipe extends Component {
    state = {
        ingredientInput: []
    }

    index = 1

    componentDidMount() {
        this.addIngredientInput();
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    addIngredients = () => {
        const ingredients = []
        for (let i = 1; i < this.state.ingredientInput.length + 1; i++) {
            ingredients.push(this.state[`ingredient${i}`]);
        }
        return ingredients;
    };

    handleSubmit = e => {
        e.preventDefault();
        RecipeArray.push({
            id: RecipeArray.length + 1,
            name: this.state.name,
            ingredients: this.addIngredients(),
            directions: this.state.directions
        })
        this.setState({
            recipeAdded: true
        });
    }

    addIngredientInput = () => {
        this.setState(state => {
            const ingredientInput = [...state.ingredientInput,
            <input key={this.index} name={`ingredient${this.index++}`} id='ingredient'
                onChange={this.handleInputChange} value={this.ingredients1} ></input>];
            return {
                ingredientInput
            };
        });
    }

    addRecipeForm = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Recipe Name:</label>
                <input name='name' id='name' onChange={this.handleInputChange} value={this.name} required></input>
                <label htmlFor='ingredient'>ingredient:</label>
                <button type='button' onClick={this.addIngredientInput}>add Ingredient</button>
                {this.state.ingredientInput}
                <label htmlFor='directions'>directions:</label >
                <textarea name='directions' id='directions' onChange={this.handleInputChange} value={this.directions}
                    style={{ width: "200px", height: "100px" }} required></textarea>
                <button >Submit</button>
            </form>
        )
    }

    render() {
        return (this.state.recipeAdded ? <h1>Thanks for adding your amazing Recipe to our Recipe list!</h1> : this.addRecipeForm());
    }
}
export default addRecipe;