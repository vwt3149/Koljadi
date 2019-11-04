import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo'
import MenuButton from '../../UI//Buttons/MenuButton/MenuButton';

import './Toolbar.css';

const toolBar = (props) =>{
    
    return(
        <header className={['Toolbar', props.auth? null : 'UnAuth'].join(' ')}>
            <div>
                <Link className='HeadingLink' to='/home'>
                <h1 className = "Heading">Koljadi</h1>
                    <Logo />
                </Link>
            </div>
            
            
              {/* <NavigationItems/> */}
             { props.auth?<MenuButton isOpen={props.isOpen} clicked={props.sideDrawerOpen}/> : null}
        </header>
    );
}

export default toolBar;