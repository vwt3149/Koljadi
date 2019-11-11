import React, { Component } from 'react';
import { connect } from 'react-redux';
import Koljadi from '../../components/Koljadi/Koljadi';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from '../../axios/axios';
import {onGetKoljadi} from '../../store/actions/koljadi'
// import * as firebase from 'firebase';

import './Random.css';
class Random extends Component{

    state = {
        koljadi:null,
        // isLoading:false,
        updatedKoljadi:null,
        clicked:false,
        firebaseConfig: false,
        updatedKoljadiFirebase: null
    }

     componentDidMount(){
   


        // if (!firebase.apps.length) {
        //     firebase.initializeApp(firebaseConfig);

        // }
        // const database = firebase.database();
        // const  ref = database.ref('randomLyrics');
        // ref.on('value', gotData, err);
        
        // function gotData(data){
        //     // console.log(data.val());
        //     // console.log('[Data]'); 
        // }

        //  function err (err)  {
        //     // console.log(err);
        //     // console.log('[Err]');

        // }
        
      
    }
  

     async getKoljadiHandler(){
        try {
            const response = await axios.get('/lyrics.json');
            this.setState({
                koljadi: response.data,
                // isLoading: false,
                // clicked:false
            })
            console.log(response)
        
        } catch (error) {
            // this.setState({isLoading: false})
            // console.log(error);
            console.info(error)
        }
    }


     randomGenerator = () =>{
        const koljadiLength = Object.getOwnPropertyNames(this.props.koljadi).length;
        let generate = () =>{
            let generateFirst, generateSecond;
            do{
                 generateFirst = Math.floor(Math.random() * koljadiLength);
                 generateSecond = Math.floor(Math.random() * koljadiLength);
            }
            while (generateFirst === generateSecond) 
            const koljadiTitle = Object.keys(this.props.koljadi)
            return {
                first: koljadiTitle[generateFirst],
                second: koljadiTitle[generateSecond]
            }
        }
       return generate()
        
    }
    
  

   async  randomKoljadiClickHandler(){
    const koljadi = !this.props.koljadi? this.props.onGetKoljadi() :null;

    //    if (!this.props.koljadi) {
    //     await this.getKoljadiHandler();
    //    }
    //    const databaseRef = firebase.database().ref('randomLyrics');
      if (this.props.koljadi) {
     
      const {first, second} = this.randomGenerator();
    //    databaseRef.set({
    //      first,
    //      second
    //     });

    //  await  databaseRef.on( 'value', data => {this.setState({updatedKoljadiFirebase:data.val()})  })
       
        // const { first: f, second: s} =  this.state.updatedKoljadiFirebase;
        let filterKoljadi = Object.keys(this.props.koljadi).filter( koljada => koljada === first || koljada === second? koljada : null)

        let koljadi={};
        filterKoljadi.map( koljada => {
            koljadi[koljada] = this.props.koljadi[koljada];
            return null;
        });
        this.setState({updatedKoljadi: {...koljadi}})
      }

    
    }

   spinner(){
      return this.state.clicked && !this.props.koljadi? <Spinner/> : null
    //    if ) {
    //        return <Spinner/>
    //    }
   }
    
    render(){
      
        let koljadi = this.state.updatedKoljadi? <Koljadi koljadi={this.state.updatedKoljadi}/> : null;
        
        window.scrollTo({top: 0})
        return(
            
            <section className='Random'>
                    {koljadi}
                    {this.spinner()}
                    <div className='PressButton'>
                        <h2>Press button for random Koljadi</h2>
                        <button onClick={ () => {
                            this.setState({clicked: true})
                            this.randomKoljadiClickHandler()
                            }}>Press</button>
                    </div>

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
export default connect(mapStateToProps,mapDispatchToProps)(Random)
