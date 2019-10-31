import React from 'react';

const input = (props) => {
    let inputElement = null;

    const inputClasses = ['InputElement'];
    props.invalid && props.touched? inputClasses.push('invalid') : null;

    switch (props.elementType) {
       case('input'):
        inputElement= <input
            className= {inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}
            {...props.elementConfig}
        />
        default:
            break;
    }

    return(
        <div className='Input'>
            {inputElement}
        </div>
    );
}

export default input
