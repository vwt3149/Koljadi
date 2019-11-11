import React from 'react';
import { NavLink } from 'react-router-dom'

import './NavigationItem.css';

const navigationItem = (props) =>{
    // const delay = setTimeout( () => props.closeOnClick , 1000)
    return(
        <li className='NavigationItem' onClick={() =>{
                props.closeOnClick()
               const logOut =  props.onLogOut? props.onLogOut() :null 
             }} >
            <NavLink activeClassName='NavigationItemActive' to={props.link}>
                {props.children}
            </NavLink>
        </li>
    );
}

export default navigationItem;
