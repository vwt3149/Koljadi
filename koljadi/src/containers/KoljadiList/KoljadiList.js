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
            
        }
       
        
        
    render(){
       setTimeout(() => {
           //Scrolling to Koljada automatically
            if(this.props.location.state && koljadi){
                // console.log(this.props.location.state,'[STATE]')
                // console.log(koljadi,'[KOLJADI]')
                const id = Array.from(this.props.location.state).filter((val) => val !== '#')
                const res = id.join('');

                if ( document.getElementById(res)) {
                    document.getElementById(res).scrollIntoView()
                }
            }
        },800);

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