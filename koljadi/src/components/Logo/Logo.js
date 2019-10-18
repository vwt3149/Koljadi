import React from 'react';

import ruthenianLogo from '../../assets/img/logo.png'
import './Logo.css'
const logo = (props) => {
    return(
        <div className={'Logo'}  style={props.style}>
            <img src={ruthenianLogo} alt='Ruthenian Symbol'/>
        </div>
    )
}

export default logo