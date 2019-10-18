import React, { Component } from 'react';

import Koljadi from '../../components/Koljadi/Koljadi';
import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux';

class KoljadiList extends Component{

    state = {
        koljadi: null,
        isLoading: false
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
        let koljadi = <Spinner/>;
        if (this.state.koljadi !== null && !this.state.isLoading) {
            koljadi = <Koljadi koljadi={this.state.koljadi}/>
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