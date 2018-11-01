import React, { Component } from 'react';
import Recipe from './displayRecipe';

class Recipes extends Component {
    state = {
        recipe: [
            {
                id: 1,
                name: 'Apricot Pie',
                ingredients: ['margerine', 'eggs', 'sugar', 'flour', 'vanilla sugar', 'baking powder', 'apricots'],
                directions: `mix: 1 cup flour, 1 cup sugar, 1 stick margarine, 2 eggs, 1 tablespoon vanilla sugar, 
                1/2 teaspoon baking powder. pour into Pyrex dish & place sliced apricots on top`
            },
            {
                id: 2,
                name: 'Rosmarie Pie',
                ingredients: ['margerine', 'dessert topping', 'rosmarie chocolate', 'eggs', 'sugar', 'pie crust'],
                directions: `melt: 1 1/2 stick margerine, bar of rosmarie chocolate. beat: 4 eggs, 
                3/4 cup of sugar. add melted chocolate & beat for 5 minutes, pour in pie crust & freeze. 
                whip: desert topping & put on top of pie.`
            },
            {
                id: 3,
                name: 'Fudge',
                ingredients: ['chocolate chips', 'corn syrup', 'vanilla extract', 'margerine', 'dessert topping'],
                directions: `melt: 1 package chocolate chips, 1 tablespoon corn syrup, 1 teaspoon vanilla extract, 
                1/2 stick margarine. add: 3/4 of dessert topping.`
            }
        ],
        showRecipe: false

    }

    getRecipesList() {
        return this.state.recipe.map(recipe => <h3 key={recipe.id} onClick={() => { this.currentRecipe = recipe; this.showRecipe(); }}>{recipe.name}</h3>);
    }

    hideRecipe = () => {
        this.setState({ showRecipe: false })
    }
    showRecipe = () => {
        this.setState({ showRecipe: true })
    }


    render() {
        if (!this.state.showRecipe) {
            return (this.getRecipesList());
        } else {
            return (
                <div>
                    <button onClick={this.hideRecipe}>Home</button>
                    <Recipe recipe={this.currentRecipe} />
                </div>
            );
        }
    }
}

export default Recipes;