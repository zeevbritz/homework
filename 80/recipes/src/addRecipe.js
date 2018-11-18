import React, { Component } from 'react';
import RecipeArray from './recipeArray.js';
import './addRecipe.css';

class addRecipe extends Component {
    state = {
        ingredientInput: []
    }

    ingredientId = 1;

    componentDidMount() {
        this.addIngredientInput();
    }

    addIngredientInput = () => {
        this.setState(state => {
            const ingredientInput = [...state.ingredientInput, { id: this.ingredientId++, ingredient: '' }];
            return {
                ingredientInput
            }
        })
    }

    displayIngredientInput = () => {
        return this.state.ingredientInput.map(e =>
            <div className= 'ingredient' key={e.id}>
                <input name={'ingredient'} id={e.id}
                    onChange={this.IngredientInputChange} value={e.ingredient} ></input>
                <button type='button' onClick={() => { this.deleteInput(e.id) }}>Delete</button>
            </div>
        )
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    IngredientInputChange = e => {
        const target = e.target;
        const value = target.value;
        const id = parseInt(target.id)

        this.setState(state => {
            let currIndex;
            let ingredientInputs = [...state.ingredientInput];
            const currObj = { ...ingredientInputs.find((obj, index) => { currIndex = index; return obj.id === id }) };
            currObj.ingredient = value;
            ingredientInputs[currIndex] = currObj;
            return {
                ingredientInput: ingredientInputs
            }
        })
    }

    deleteInput = id => {
        this.setState(state => {
            let ingredientInput = state.ingredientInput.filter(obj => obj.id !== id);
            return {
                ingredientInput
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        RecipeArray.push({
            id: RecipeArray.length + 1,
            name: this.state.name,
            ingredients: this.addIngredientsForSubmission(),
            directions: this.state.directions
        })
        this.setState({
            recipeAdded: true
        });
    }

    addIngredientsForSubmission = () => {
        const ingredients = []
        this.state.ingredientInput.forEach(e => ingredients.push(e.ingredient));
        return ingredients;
    };

    addRecipeForm = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Recipe Name:</label>
                <input name='name' id='name' onChange={this.handleInputChange} value={this.name} required></input>
                <label htmlFor='ingredient'>ingredient:</label>
                {this.displayIngredientInput()}
                <button type='button' onClick={this.addIngredientInput}>add Ingredient</button>                
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