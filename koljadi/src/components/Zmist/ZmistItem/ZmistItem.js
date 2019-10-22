import React from 'react';

import './ZmistItem.css'
const zmistItem = (props) =>{
    return(
        <li className='ZmistItem' id={`#${props.id}`} onClick={props.clicked}>
            <p id={`#${props.id}`}> {props.title} </p>
        </li>
    );
}

export default zmistItem;
