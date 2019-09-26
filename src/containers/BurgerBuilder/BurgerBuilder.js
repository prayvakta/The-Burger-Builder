import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

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
        totalPrice: 4,
        purchasable: false,
        purchaseMode: false,
        loading: false
    }

    purchaseModeHandler = () =>{
        this.setState({purchaseMode: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchaseMode: false})   
    }

    checkoutHandler = () => {
        this.setState({loading: true });
        const order ={
            customer: 'Pray Vakta',
            customerPhNum: '4164014321',
            address: {
                stree: '123 Main st.',
                city: 'Toronto',
                postalCode: 'M1A2B3'
            },
            customerEmail: 'prayvakta@email.com',
            deliveryMethod: 'Pick-up',
            ingredients: this.state.ingredientList,
            price: this.state.totalPrice
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchaseMode: false});
            })
            .catch(error => {
                this.setState({loading: false, purchaseMode: false});
            });
    }

    purchasableHandler (ingredients) {
        const sum = Object.values(ingredients).reduce((sum, el) => {
            return sum + el;
        } ,0);
        this.setState({purchasable: sum});
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
        this.purchasableHandler(updatedIngredient);
    }

    // *** TRY TO IMPROVE THIS FUNCTION ***
    ingredientRemovedHandler = (type) =>{
        const oldCount = this.state.ingredientList[type];
        if(oldCount < 1){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredientList
        };
        updatedIngredient[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({totalPrice: newPrice, ingredientList: updatedIngredient});
        this.purchasableHandler(updatedIngredient);
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredientList
        };
        
        for(let eachItem in disabledInfo){
            disabledInfo[eachItem] = disabledInfo[eachItem] <= 0;
        }

        let orderSummary = <OrderSummary 
                                ingredients={this.state.ingredientList}
                                price={this.state.totalPrice} 
                                cancelClicked={this.purchaseCancelHandler}
                                checkoutClicked={this.checkoutHandler}/>

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
        <Aux>
            <Modal show={this.state.purchaseMode} clicked={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            <Burger ingredientList={this.state.ingredientList}/>
            <BuildControls 
                addIngredient={this.ingredientAddedHandler}
                removeIngredient={this.ingredientRemovedHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice.toFixed(2)}
                disable={this.state.purchasable}
                clicked={this.purchaseModeHandler}/>
        </Aux>
        )
    }
}

export default BurgerBuilder;