import React from 'react';

import ToTopArrow from '../../../assets/img/toTop.png'
import './BackToTopButton.css';
const backToTopButton = () => {
    return(
        <div className='BackToTopButton' onClick={() => window.scrollTo({top: 0})}>
            <img style={{height: '500px'}} alt='Back To Top' src={ToTopArrow}/>
            </div>
    );
}

export default backToTopButton;
