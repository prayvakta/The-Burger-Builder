import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1.0,
    cheese: 0.75,
    meat: 2.5
}

class BurgerBuilder extends Component{

    state = {
        ingredientList: {
            bacon: 0,
            meat: 0,
            salad: 0,
            cheese: 0
        },
        totalPrice: 4
    }

    // *** TRY TO IMPROVE THIS FUNCTION ***
    ingredientAddedHandler = (type) =>{
        const oldCount = this.state.ingredientList[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredientList
        };
        updatedIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredientList: updatedIngredient});
    }

    render(){
        return (
        <Aux>
            <Burger ingredientList={this.state.ingredientList}/>
            <BuildControls 
                addIngredient={this.ingredientAddedHandler}/>
        </Aux>
        )
    }
}

export default BurgerBuilder;