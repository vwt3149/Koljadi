import React from 'react';
import Aux from '../../../hoc/Aux';
import NavigationItem from './NavigationItem/NavigationItem';
import Logo from '../../Logo/Logo';
import './NavigationItems.css';

const navigationItems = (props) => {

    const authNav = (
        <Aux>
            <Logo style={{cursor:'pointer'}} />
            <NavigationItem closeOnClick={props.closeDrawer} link='/home'>Home</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} link='/koljadi'>Koljadi</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} link='/random'>Random</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} link='/profile'>Profile</NavigationItem>
        </Aux>
    )
    return(
        <ul className={['NavigationItems', props.typeOfNavigation === 'Mobile'? 'Mobile' : 'Desktop'].join(' ')}>
            {authNav}
        </ul>
    );

}

export default navigationItems;
