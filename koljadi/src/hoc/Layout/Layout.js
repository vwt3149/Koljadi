import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import './Layout.css'
import BackToTopButton from '../../components/UI/BackToTopButton/BackToTopButton';

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
            <div className='Layout'>
                
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
                      <BackToTopButton/>
                    {this.props.children}
                   
                </main>
                
            </div>
               
           
        );
    }
}

export default Layout;