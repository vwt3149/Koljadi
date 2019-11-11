import React, { Component } from 'react';
import {connect} from 'react-redux';
import Koljadi from '../../components/Koljadi/Koljadi';
// import axios from '../../axios/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
// import Aux from '../../hoc/Aux';
import {onGetKoljadi} from '../../store/actions/koljadi';
import './KoljadiList.css'

class KoljadiList extends Component{

    // state = {
    //     koljadi: null,
    //     isLoading: false,
    //     loaded: false
    // }
   
     async componentDidMount(){
            // this.setState({isLoading:true})
            // try {
            //     const response = await axios.get('/lyrics.json');
            //     this.setState({
            //         koljadi: response.data,
            //         isLoading: false,
            //         loaded: true
            //     })
       
            // } catch (error) {
            //     this.setState({isLoading: false})
            //     console.log(error);
            // }
            const koljadi = !this.props.koljadi? this.props.onGetKoljadi() :null;   
          
            
            
            
            //Scrolling to Koljada automatically&& this.state.loaded
            if (this.props.location.state ) {
                if (this.props.location.state.koljadaID && this.props.koljadi) {
                    const id = this.props.location.state.koljadaID;
                    console.log(id)
                    const timingOfScroll = Number(`${this.props.location.state.indexOfKoljadi + 1}00`) ;
                   
                    if (  document.getElementById(id)) {
                        setTimeout(() => {
                            document.getElementById(id).scrollIntoView();
                            // this.setState({loaded: false})
                        }, timingOfScroll );
                    }
                }
            }
            

        }
       
        
        
    render(){
        console.log(window)
        let koljadi = <Spinner/>;
        if (this.props.koljadi !== null && !this.props.isLoading) {
            console.log('[DACO]', this.props.koljadi)
            koljadi =( <Koljadi 
                        history={this.props.history}
                        koljadi={this.props.koljadi}
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

const mapStateToProps = (state) =>{
    return{
        koljadi: state.koljadi.koljadi,
        isLoading: state.koljadi.isLoading
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        onGetKoljadi: () => dispatch(onGetKoljadi())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(KoljadiList) ;