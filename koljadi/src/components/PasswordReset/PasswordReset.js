import React, { useState } from 'react';
import { useHistory } from 'react-router'
import Input from '../UI/Input/Input';
import Button from '../UI/Buttons/Button/Button';
import {firebaseInit, firebaseResetPasswordEmail} from '../../firebase/firebase';
import Spinner from '../UI//Spinner/Spinner';
import './PasswordReset.css'
function PasswordReset(props){
    const history = useHistory();
    const [state, setState] = useState(
      {    
            authInputsElements:{
            email:createInputElement('input', 'text', 'E-mail'
            // ,{autoComplete:'off'}
            ,{}
            ,{minLength:6, maxLength:256, isEmail:true }),
        },
        isLoading: false,
    }
    )
        console.log(state)
    const authInputsElements = Object.entries(state.authInputsElements)
        .map( element => {
            console.log(element)
            const el = element[1];

            return <Input
            id={element[0]}
            key={element[0]}
            elementConfig={el.elementConfig}
            elementType={el.elementType}
            value={state.authInputsElements[element[0]].value}
            invalid={!state.authInputsElements[element[0]].validation.valid}
            onTypeChange={onTypeChangeHandler}
            />
        })

     function checkValidityHandler(value, rules){
            let isValid = true;
            if ( !rules ) {
                return true;
            }
    
            if ( rules.required ) {
                isValid = value.trim() !== '' && isValid;
            }
    
            if ( rules.minLength ) {
                isValid = value.length >= rules.minLength && isValid
            }
    
            if ( rules.maxLength ) {
                isValid = value.length <= rules.maxLength && isValid
            }
    
            if ( rules.isEmail ) {
                const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = pattern.test( value ) && isValid
            }
            
           
                return isValid;
        }

        function onTypeChangeHandler(el) {
    
            if (el.value.length <= state.authInputsElements[el.id].validation.maxLength) {
                // console.log(el.value)
            let updatedAuthElements = {
                ...state.authInputsElements,
                    [el.id]:{
                        ...state.authInputsElements[el.id],
                        value:el.value,
                        validation:{
                            ...state.authInputsElements[el.id].validation,
                            valid:checkValidityHandler(el.value,state.authInputsElements[el.id].validation)
                        }
                    }
    
                }
                setState({
                    ...state,
                    authInputsElements: updatedAuthElements
                })
            }
        };  

        
   function createInputElement(elementType, type, name, ...rest ){
        let element = {
            elementType,
            elementConfig:{
                name,
                type,
                required:'required',
                ...rest[0],
                
            },
            value:'',
            validation:{
                required: true,
                valid: false,
                ...rest[1]
            },
            touched:false
        }
        return element;
    }
    
    
  async function onResetPasswordHandler(email, valid ){
      setState({...state,isLoading:true})
        if (valid) {
            console.log(state)
            firebaseResetPasswordEmail(email);
            setState({...state,isLoading:false});
            history.push('/auth');
        }
        

    }
    console.log(state.authInputsElements.email.validation.valid)
    return(
        <form className='PasswordReset' onSubmit={(event) => event.preventDefault() }>
            <div>
                <h2>Forgot your password?</h2>
                {state.isLoading? <Spinner/> : null}    
            {authInputsElements}
            <Button active
                    style={{justifyContent:'center'}}
                    onClick={() => onResetPasswordHandler(state.authInputsElements.email.value, state.authInputsElements.email.validation.valid)}
                    >Reset Password</Button>
            </div>
            
            
        
        </form>
    )
}

export default PasswordReset
