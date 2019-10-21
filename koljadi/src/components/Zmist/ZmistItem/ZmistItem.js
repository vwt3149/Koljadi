import React from 'react';

import './ZmistItem.css'
const zmistItem = (props) =>{
    return(
        <li className='ZmistItem'>
            <p> {props.title} </p>
        </li>
    );
}

export default zmistItem;
