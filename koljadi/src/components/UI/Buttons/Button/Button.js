import React from 'react';

import Spinner from '../../Spinner/Spinner';
import './Button.css'
const socialButton = (props) => {
    return(
        <button 
        onClick={props.onClick} 
        className={['SocialButton',props.active? 'Active' : null].join(' ')}
        style={props.style}
        type={props.type} 
         >
            {props.children}
            <img style={props.imgStyle} src={props.logo} alt={props.alt}/>
        </button>
    );
}

export default socialButton;
