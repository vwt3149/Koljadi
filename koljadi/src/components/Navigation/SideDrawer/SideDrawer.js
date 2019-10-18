import React from 'react';

import BackDrop from '../../UI/BackDrop/BackDrop';
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Aux';
import './SideDrawer.css';

const sideDrawer = (props) =>{
    return(
        <Aux>
             <BackDrop show={props.show} clicked={props.close} />
            <div className={['SideDrawer', props.visible? 'Open' : 'Close'].join(' ')}>
                <nav>
                    <NavigationItems
                        closeDrawer={props.close}
                        typeOfNavigation ='Mobile'
                    />
                </nav>
            </div>
        </Aux>
       

    );
}

export default sideDrawer;
