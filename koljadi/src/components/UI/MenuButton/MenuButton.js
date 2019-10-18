import React from 'react';

import './MenuButton.css'
const menuButton = (props) =>{
    const isOpen = () => props.isOpen? 'MenuButtonLine OpenButton' : 'MenuButtonLine'
    return(
        <div className='MenuButton' onClick={props.clicked}>
            <div className={isOpen()} id='line1' ></div>
            <div className={isOpen()} id='line2'></div>
            <div className={isOpen()} id='line3'></div>
        </div>
        

    );
}

export default menuButton;
