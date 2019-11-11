import React, { Component } from 'react';
import {connect} from 'react-redux';
import Typed from 'typed.js';
import Zmist from '../../components/Zmist/Zmist';
import axios from '../../axios/axios';
import Spinner from '../../components//UI/Spinner/Spinner';
import {onGetKoljadi} from '../../store/actions/koljadi';
import './HomePage.css';


class HomePage extends Component{

    state = {
        koljadi: null,
        isLoading:false
    }

    componentDidMount(){

        // window.location.hash = '';
        // this.setState({isLoading:true})
        // try {
        //     const response = await axios.get('/lyrics.json');
        //     this.setState({
        //         koljadi: response.data,
        //         isLoading: false
        //     })
        //     console.log(response);
            
        // } catch (error) {
        //     this.setState({isLoading: false})
        //     console.log(error);
        // }
        // if(!this.props.koljadi) this.props.onGetKoljadi();
        const koljadi = !this.props.koljadi? this.props.onGetKoljadi() :null;

     
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
        // console.log(event.target.id,'[event id]')
        window.scrollTo({top:0})
        // console.log( Object.getOwnPropertyNames(this.state.koljadi), '[Reci]')
        this.props.history.push({
            pathname:`/koljadi`,
            state:{
                koljadaID: event.target.id,
                indexOfKoljadi: Object.getOwnPropertyNames(this.props.koljadi).indexOf(event.target.id)
            }
            
        });

    }


    render(){

        let zmist = <Spinner/>;
        if (this.props.koljadi !== null && !this.props.isLoading) {
            zmist = <Zmist
                    clicked={  this.zmistClickHandler}
                    koljadi={this.props.koljadi}/>
        }
        
        

        return(
           <div className='HomePage'>
               <h3 className='HomePageHeader'>RuthenianFinestKoljadi</h3>
               {zmist}
               {/* <Spinner/> */}
           </div>
           
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
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);