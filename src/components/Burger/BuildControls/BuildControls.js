import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl';

const CONTROLS = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total Price: <strong>{props.price}</strong></p>
        {CONTROLS.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.addIngredient(ctrl.type)}
                remove={() => props.removeIngredient(ctrl.type)} 
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={classes.OrderButton}
                disabled={!props.disable}
                onClick={props.clicked}>ORDER NOW</button>
    </div>
)

export default buildControls;