import React, { Component } from 'react';

import google from '../../assets/img/google.png';
import facebook from '../../assets/img/facebook.png';
import Button from '../../components/UI/Buttons/Button/Button';
import './Auth.css';

class Auth extends Component {
    state = {
        inputsInfo:{
            email:this.createInputElement('input', 'email', 'Your email'),
            password:this.createInputElement('input', 'password', 'Your password'),
            passwordRepeat:this.createInputElement('input', 'password', 'Repeat password')
        }
    }

    componentDidMount(){
        console.log(this.state)
    }

    createInputElement(elementType, type, placeholder, minLength = 6, maxLength = 25 ){
        let element = {
            elementType,
            elementConfig:{
                placeholder,
                type,
                required:'required',
                maxLength,
                minLength,
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

    render(){
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

                </form>
                <Button style={{justifyContent:'center'}}>Daco</Button>
                
            </div>
        );
    }
}

export default Auth;
