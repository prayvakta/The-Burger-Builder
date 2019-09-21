import React from 'react'

import classes from "./Burger.module.css";
import Ingredient from './Ingredient';

const burger = (props) => {


    let ingredientFromProp = Object.keys(props.ingredientList)
        .map(igKey => {
            return [...Array(props.ingredientList[igKey])].map((_,i) => {
                return <Ingredient type={igKey} key={igKey+i} />
            })
        })
        .reduce((initialValue, currentValue) => initialValue.concat(currentValue), [])

    if(ingredientFromProp.length === 0){
        ingredientFromProp = <p>Please add ingredients!</p>
    }

    return(
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredientFromProp}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;