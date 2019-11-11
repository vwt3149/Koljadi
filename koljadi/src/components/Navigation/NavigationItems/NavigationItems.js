import React from 'react';
// import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Aux';
import NavigationItem from './NavigationItem/NavigationItem';
import Logo from '../../Logo/Logo';
import * as action from '../../../store/actions/auth';
import './NavigationItems.css';

const navigationItems = (props) => {

    const authNav = (
        <Aux>
            <Logo style={{cursor:'pointer'}} />
            <NavigationItem closeOnClick={props.closeDrawer} link='/home'>Home</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} link='/koljadi'>Koljadi</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} link='/random'>Random</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} link='/profile'>Profile</NavigationItem>
            <NavigationItem closeOnClick={props.closeDrawer} onLogOut={props.onLogOut} link='/auth'>Logout</NavigationItem>

        </Aux>
    )
    return(
        <ul className={['NavigationItems', props.typeOfNavigation === 'Mobile'? 'Mobile' : 'Desktop'].join(' ')}>
            {authNav}
        </ul>
    );

}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(action.onLogOut())
    }
}
export default connect(null , mapDispatchToProps)(navigationItems);
