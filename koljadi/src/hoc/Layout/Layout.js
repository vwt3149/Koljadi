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
        auth: false
    }
    
    OpenSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }
    
    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }
    render(){
        const authLayout = (
            
                 <div className='Layout'>
                
                <Toolbar
                    auth={this.state.auth}
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
                <Footer/>
            </div>
            
            
        );
        const unAuthLayout = (
            
                 <div className='Layout'>
                 <Toolbar
                    auth={this.state.auth}
                    isOpen = {this.state.showSideDrawer}
                    sideDrawerOpen={this.state.showSideDrawer? this.closeSideDrawerHandler :this.OpenSideDrawerHandler}
                />
                <main>
                    {this.props.children}
                </main>
                 </div>
           
        );
        return (
            <Aux>
                 {this.state.auth? authLayout : unAuthLayout}
            </Aux>
          
           
        );
    }
}

export default Layout;