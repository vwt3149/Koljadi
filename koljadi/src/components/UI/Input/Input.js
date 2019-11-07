import React from 'react';

import './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];
    const onTypeChangeHandler = (event) => {
        // console.log(props.invalid)
        props.onTypeChange(event.target);
    }

    
   
    switch (props.elementType) {
       case('input'):
        if (props.invalid) inputClasses.push('Invalid');
        
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
