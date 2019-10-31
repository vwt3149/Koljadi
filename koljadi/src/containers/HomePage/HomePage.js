import React, { Component } from 'react';

import Typed from 'typed.js'
import Zmist from '../../components/Zmist/Zmist';
import axios from '../../axios/axios';
import Spinner from '../../components//UI/Spinner/Spinner';

import './HomePage.css';


class HomePage extends Component{

    state = {
        koljadi: null,
        isLoading:false
    }

   async componentDidMount(){

        window.location.hash = '';
        this.setState({isLoading:true})
        try {
            const response = await axios.get('/lyrics.json');
            this.setState({
                koljadi: response.data,
                isLoading: false
            })
            console.log(response);
            
        } catch (error) {
            this.setState({isLoading: false})
            console.log(error);
        }

     
    }

    autoTypedHeader(){
        const options = {
            strings: ["RuthenianFinestKoljadi"],
            typeSpeed: 80,
            showCursor: false,
          };
          
          this.typed = new Typed('.HomePageHeader', options);
          
    }
    
    zmistClickHandler = (event) =>{
        console.log(event.target.id)
        // console.log( Object.getOwnPropertyNames(this.state.koljadi), '[Reci]')
        this.props.history.push({
            pathname:`/koljadi`,
            state:{
                koljadaID: event.target.id,
                indexOfKoljadi: Object.getOwnPropertyNames(this.state.koljadi).indexOf(event.target.id)
            }
            
        });

    }


    render(){

        let zmist = <Spinner/>;
        if (this.state.koljadi !== null && !this.state.isLoading) {
            zmist = <Zmist
                    clicked={  this.zmistClickHandler}
                    koljadi={this.state.koljadi}/>
        }
        
        

        return(
           <main className='HomePage'>
               <h3 className='HomePageHeader'>RuthenianFinestKoljadi</h3>
               {zmist}
               {/* <Spinner/> */}
           </main>
           
        );
    }
}

export default HomePage;