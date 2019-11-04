import React, { Component } from 'react';

import Koljadi from '../../components/Koljadi/Koljadi';
import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Aux from '../../hoc/Aux';
import './KoljadiList.css'

class KoljadiList extends Component{

    state = {
        koljadi: null,
        isLoading: false,
        loaded: false
    }
   
     async componentDidMount(){
            this.setState({isLoading:true})
            try {
                const response = await axios.get('/lyrics.json');
                this.setState({
                    koljadi: response.data,
                    isLoading: false,
                    loaded: true
                })
       
            } catch (error) {
                this.setState({isLoading: false})
                console.log(error);
            }
            
            
            //Scrolling to Koljada automatically
            if (this.props.location.state && this.state.loaded) {
                if (this.props.location.state.koljadaID && this.state.koljadi) {
                    const id = this.props.location.state.koljadaID
                    const timingOfScroll = Number(`${this.props.location.state.indexOfKoljadi + 1}00`) ;
                   
                    if (  document.getElementById(id)) {
                        setTimeout(() => {
                            document.getElementById(id).scrollIntoView();
                            this.setState({loaded: false})
                        }, timingOfScroll );
                    }
                }
            }
            

        }
       
        
        
    render(){
        console.log(window)
        let koljadi = <Spinner/>;
        if (this.state.koljadi !== null && !this.state.isLoading) {
            console.log('[DACO]', this.state.koljadi)
            koljadi =( <Koljadi 
                        history={this.props.history}
                        koljadi={this.state.koljadi}
                        /> )             
        }

        return(
            <section className='KoljadiList'>
                <h2>Koljadi</h2>
                {koljadi}
            </section>
        );
    }
}

export default KoljadiList;