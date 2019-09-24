import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }

    render(){
        return(
            <Aux>
                <Toolbar open={this.openSideDrawerHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;