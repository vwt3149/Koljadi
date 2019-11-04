import React from 'react';

import './Button.css'
const socialButton = (props) => {
    return(
        <button className={['SocialButton',props.active? 'Active' : null].join(' ')} style={props.style}>
            {props.children}
            <img style={props.imgStyle} src={props.logo} alt={props.alt}/>
        </button>
    );
}

export default socialButton;
