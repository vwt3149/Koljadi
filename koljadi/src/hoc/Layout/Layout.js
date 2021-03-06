import React, { Component } from 'react';

import Footer from '../../components/Footer/Footer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import BackToTopButton from '../../components/UI/BackToTopButton/BackToTopButton';

import Aux from '../Aux';

import './Layout.css';
class Layout extends Component{
    state = {
        showSideDrawer: false,
    
    }
    
    OpenSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
        setTimeout(() => {
            console.log(this.state.showSideDrawer,'[SIDE DRAWER]')
        },200)
    }
    
    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
        setTimeout(() => {
            console.log(this.state.showSideDrawer,'[SIDE DRAWER]')
        },200)
    }
    render(){
        const authLayout = (
            <div className='Layout'>
                
                <Toolbar
                    auth={this.props.auth}
                    isOpen = {this.state.showSideDrawer}
                    sideDrawerOpen={this.state.showSideDrawer? this.closeSideDrawerHandler :this.OpenSideDrawerHandler}
                />
                <SideDrawer
                    show={this.state.showSideDrawer}
                    close={this.closeSideDrawerHandler}
                    visible = {this.state.showSideDrawer}
                /> 
                <main>
                      <BackToTopButton/>
                    {this.props.children}
                   
                </main>
                <Footer/>
            </div>   
        );
        const unAuthLayout = (
            <div className='Layout'>
                 <Toolbar
                    auth={this.props.auth}
                    isOpen = {this.state.showSideDrawer}
                    sideDrawerOpen={this.state.showSideDrawer? this.closeSideDrawerHandler :this.OpenSideDrawerHandler}
                />
                <main>
                    {this.props.children}
                </main>
                <Footer/>
            </div>
           
        );
        return (
            <Aux>
                 {this.props.auth? authLayout : unAuthLayout}
            </Aux>
          
           
        );
    }
}

export default Layout;