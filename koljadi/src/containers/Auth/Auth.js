import React, { Component } from 'react';

import google from '../../assets/img/google.png';
import facebook from '../../assets/img/facebook.png';
import Button from '../../components/UI/Buttons/Button/Button';
import Input from '../../components/UI/Input/Input';
import './Auth.css';
import { auth } from 'firebase';

class Auth extends Component {
    state = {
        authInputsElements:{
            email:this.createInputElement('input', 'text', 'E-mail'),
            password:this.createInputElement('input', 'password', 'Password'),
            passwordRepeat:this.createInputElement('input', 'password', 'Repeat password',)
        }
    }

    componentDidMount(){
        console.log(this.state)
    }

    createInputElement(elementType, type, name,  minLength = null, maxLength = null, ){
        let element = {
            elementType,
            elementConfig:{
                name,
                type,
                required:'required',
            },
            value:'',
            validation:{
                required: true,
                valid: false
            },
            touched:false
        }

        return element;
    }

   onTypeChangeHandler = (el) => {
       console.log({[el.id]:el.value})
    //    console.log(this.state)
    const updatedAuthElements = {...this.state.authInputsElements};
    const updatedAuthElement = {...updatedAuthElements[el.id]}
    updatedAuthElement.value = el.value; 
    updatedAuthElements[el.id] = updatedAuthElement
   
    console.log(updatedAuthElements)
    this.setState({
        authInputsElements: updatedAuthElements
    })
   }


    render(){
        const authInputsElements = Object.entries(this.state.authInputsElements)
        .map( element => {
            const el = element[1]
            console.log()
            return <Input
            id={element[0]}
            key={element[0]}
            elementConfig={el.elementConfig}
            elementType={el.elementType}
            value={this.state.value}
            onTypeChange={this.onTypeChangeHandler}
            />
        })

        const config1 = {
            type:'text',
            inputName:'Email',
            name: 'text',
            required:'required',
            
            
        }
        const config2 = {
            type:'password',
            inputName:'Password',
            name: 'password',
            required:'required'
            
        }
        return(
            

            <div className='Auth' >
                <h2>Sing in or Register</h2>
                <h3> to experience Christmas spirit</h3>
                <br/>
                <Button 
                    logo={google}
                    alt='google'
                    >With Google</Button>
                <Button
                    logo={facebook} 
                    alt='facebook'
                    imgStyle={{transform:'scale(1.4)'}}
                    >With FaceBook</Button>
                <p>Or...</p>
                <form>
                    {authInputsElements}
                  
                    <div className='AuthButtons'>
                        <Button active style={{justifyContent:'center' }}>Sing in</Button>
                        <Button style={{justifyContent:'center'}}>Register</Button>
                    </div>
                </form>
                
                
                
            </div>
        );
    }
}

export default Auth;
