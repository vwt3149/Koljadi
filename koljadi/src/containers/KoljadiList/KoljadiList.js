import React, { Component } from 'react';

import Koljadi from '../../components/Koljadi/Koljadi';
import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

class KoljadiList extends Component{

    state = {
        koljadi: null,
        isLoading: false,
    }

     async componentDidMount(){
            this.setState({isLoading:true})
            try {
                const response = await axios.get('/lyrics.json');
                this.setState({
                    koljadi: response.data,
                    isLoading: false,
                })
       
            } catch (error) {
                this.setState({isLoading: false})
                console.log(error);
            }
            
            
            //Scrolling to Koljada automatically
            if (this.props.location.state.koljadaID && this.state.koljadi) {
                const id = this.props.location.state.koljadaID
                const timingOfScroll = Number(`${this.props.location.state.indexOfKoljadi + 1}00`) ;
                if (  document.getElementById(id)) {
                    console.log(this.props)
                    console.log(timingOfScroll)
                    setTimeout(() => {
                        document.getElementById(id).scrollIntoView()
                    }, timingOfScroll );
                }
            }
            
        }
       
        
        
    render(){
        let koljadi = <Spinner/>;
        if (this.state.koljadi !== null && !this.state.isLoading) {
            
            koljadi =( <Koljadi 
                        history={this.props.history}
                        koljadi={this.state.koljadi}
                        /> )             
        }

        return(
            <Aux>
                {koljadi}
               
                {/* <Spinner/> */}
            </Aux>
        );
    }
}

export default KoljadiList;