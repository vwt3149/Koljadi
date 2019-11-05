import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;

    const onTypeChangeHandler = (event) => {
        props.onTypeChange(event.target)
    }
    const inputClasses = ['InputElement'];
    // props.invalid && props.touched? inputClasses.push('invalid') : null;

    switch (props.elementType) {
       case('input'):
        inputElement= <input
            id={props.id}
            required='required'
            className= {inputClasses.join(' ')}
            value={props.value}
            onChange={onTypeChangeHandler}
            {...props.elementConfig}
        />
        default:
            break;
    }
    
    return(
        
        <div className='Input'>
            {inputElement}
            <label htmlFor={props.elementConfig.name} className='Label'>
                <span className='ContentName'>{props.elementConfig.name}</span>
            </label>
        </div>
    );
}

export default input;
