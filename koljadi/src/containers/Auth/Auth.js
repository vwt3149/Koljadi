import React, { Component } from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';

import google from '../../assets/img/google.png';
import facebook from '../../assets/img/facebook.png';
import Button from '../../components/UI/Buttons/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Backdrop from '../../components/UI/BackDrop/BackDrop';
import Aux from '../../hoc/Aux';
import './Auth.css';
// import { auth } from 'firebase';

const ENDPOINTS = {
    SINGUP:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    SINGIN:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    API:'AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk'
}
class Auth extends Component {
    state = {
        isLoading: false,
        auth:false,
        authInputsElements:{
            email:this.createInputElement('input', 'text', 'E-mail'
            ,{autoComplete:'off'}
            // ,{}
            ,{minLength:6, maxLength:256, isEmail:true }),
            
            password:this.createInputElement('input', 'password', 'Password'
            ,{autoComplete:'current-password'}
            ,{minLength:6, maxLength:20}),
        }
    }

    componentDidMount(){
        console.log(this.props.isLoading)
    }

    createInputElement(elementType, type, name, ...rest ){
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

    checkValidityHandler = (value, rules) => {
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

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }
            return isValid;
    }


   onTypeChangeHandler = (el) => {
    
        if (el.value.length <= this.state.authInputsElements[el.id].validation.maxLength) {
            // console.log(el.value)
        let updatedAuthElements = {
            ...this.state.authInputsElements,
                [el.id]:{
                    ...this.state.authInputsElements[el.id],
                    value:el.value,
                    validation:{
                        ...this.state.authInputsElements[el.id].validation,
                        valid:this.checkValidityHandler(el.value,this.state.authInputsElements[el.id].validation)
                    }
                }

            }
            this.setState({
                authInputsElements: updatedAuthElements
            })
        }
    };  
   

   onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.dir(event.target)
      
   }

   singUpHandler = async () => {
    this.setState({isLoading:true})

    try {
        console.log('[SING UP HANDLER]')
        const{ email, password } = this.state.authInputsElements;
        const payload = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        }
        const response = await axios.post(ENDPOINTS.SINGUP+ENDPOINTS.API, payload);
        this.setState({isLoading:false})

        console.log(response.data)
    } catch (error) {
        this.setState({isLoading:false})
        console.log(error.response);
        console.log('mrk')
    }
   }

   singInHandler = async () => {
       this.setState({isLoading:true})
    try {
        console.log('[SING In HANDLER]')
        const{ email, password } = this.state.authInputsElements;
        const payload = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        }
        const {data} = await axios.post(ENDPOINTS.SINGIN+ENDPOINTS.API, payload);
        this.setState({
            isLoading: false,
            auth:  true
        });
       

    } catch (error) {
        this.setState({isLoading:false})
        console.log(error.response);
    }
   }

  
   
    render(){
        const authInputsElements = Object.entries(this.state.authInputsElements)
        .map( element => {
            const el = element[1];

            return <Input
            id={element[0]}
            key={element[0]}
            elementConfig={el.elementConfig}
            elementType={el.elementType}
            value={this.state.authInputsElements[element[0]].value}
            invalid={!this.state.authInputsElements[element[0]].validation.valid}
            onTypeChange={this.onTypeChangeHandler}
            />
        })

        const{email, password} = this.state.authInputsElements;
        let validSubmit = false;
        if (email.validation.valid && password.validation.valid) {
            validSubmit = true;
        }
        console.log(validSubmit);
     
        return(
            
                 <div className='Auth' >
                 {this.state.isLoading? <div  className='Spinner'><Backdrop show={this.state.isLoading}/> <Spinner/> </div> : null}
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
                  {/* <form onSubmit={validSubmit? this.onSubmitHandler : null}> */}
                  <form onSubmit={this.onSubmitHandler}>
                      {authInputsElements}
                      <div className='AuthButtons'>
 
                          <Button  
                              style={{justifyContent:'center' }}
                              onClick={validSubmit? this.singInHandler: null}
                              type='submit'
                              >Sing in</Button>
                          <Button
                             active
                           style={{justifyContent:'center'}}
                           onClick={validSubmit? this.singUpHandler: null}
                           type='submit'
                           >Register</Button>
                      </div>
                  </form>  
              </div>
  
        );
    }
}

const mapStateToProps =  state => {
    return{
        isLoading: state.auth.isLoading
    }
};
// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }
export default connect(mapStateToProps)(withRouter(Auth));
