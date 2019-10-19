import React, { Component } from 'react';
import Aux from '../Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    OpenSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }
    
    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }
    render(){
        return (
            <Aux>
                <Toolbar
                    isOpen = {this.state.showSideDrawer}
                    sideDrawerOpen={this.state.showSideDrawer? this.closeSideDrawerHandler :this.OpenSideDrawerHandler}
                />
                <SideDrawer
                    closeDrawer={this.closeSideDrawerHandler}
                    show={this.state.showSideDrawer}
                    close={this.closeSideDrawerHandler}
                    visible = {this.state.showSideDrawer}
                />
                <main>
                    <h1>{this.props.heading}</h1>
                    {this.props.children}
                </main>
            </Aux>
               
           
        );
    }
}

export default Layout;
