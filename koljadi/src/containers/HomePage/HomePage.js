import React, { Component } from 'react';

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


    render(){

        let zmist = <Spinner/>;
        if (this.state.koljadi !== null && !this.state.isLoading) {
            zmist = <Zmist koljadi={this.state.koljadi}/>
        }

        return(
           <main className='HomePage'>
               <h3 className='HomePageHeader'>Ruthenian Finest Koljadi</h3>
               {zmist}
           </main>
           
        );
    }
}

export default HomePage;