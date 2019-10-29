import React, { Component } from 'react';

import Koljadi from '../../components/Koljadi/Koljadi';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from '../../axios/axios';
import * as firebase from 'firebase';
// import 'firebase/firebase-database'
// import * as firebase from '../../../../node_modules/@firebase';
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
    //    const config = {
    //     apiKey: 'AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk',
    //     authDomain: 'kolajdi.firebaseapp.com/',
    //     databaseURL: 'https://kolajdi.firebaseio.com/',
    //     storageBucket: 'koljadi.appspot.com',
    //     messagingSenderId: '123456789'
    //    }

       const firebaseConfig = {
            apiKey: "AIzaSyBhypgymYLiYwFNKk2Nldr9Vwl9EmQQjMk",
            authDomain: "koljadi.firebaseapp.com",
            databaseURL: "https://koljadi.firebaseio.com",
            projectId: "koljadi",
            storageBucket: "koljadi.appspot.com",
            messagingSenderId: "979777711006",
            appId: "1:979777711006:web:4abc70a5ad979349c9c48f"
          };
       

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);

        }
        const database = firebase.database();
        const  ref = database.ref('randomLyrics');
        ref.on('value', gotData, err);
        
        function gotData(data){
            // console.log(data.val());
            // console.log('[Data]'); 
        }

         function err (err)  {
            // console.log(err);
            // console.log('[Err]');

        }
        
      
    }
  

     async getKoljadiHandler(){
        try {
            const response = await axios.get('/lyrics.json');
            this.setState({
                koljadi: response.data,
                // isLoading: false,
                // clicked:false
            })
   
        } catch (error) {
            // this.setState({isLoading: false})
            // console.log(error);
            console.info(error)
        }
    }


     randomGenerator = () =>{
        const koljadiLength = Object.getOwnPropertyNames(this.state.koljadi).length;
        let generate = () =>{
            let generateFirst, generateSecond;
            do{
                 generateFirst = Math.floor(Math.random() * koljadiLength);
                 generateSecond = Math.floor(Math.random() * koljadiLength);
            }
            while (generateFirst === generateSecond) 
            const koljadiTitle = Object.keys(this.state.koljadi)
            return {
                first: koljadiTitle[generateFirst],
                second: koljadiTitle[generateSecond]
            }
        }
       return generate()
        
    }
    componentWillUnmount(){
        console.log('UNmount')
    }
  

   async  randomKoljadiClickHandler(){
       
       if (!this.state.koljadi) {
        await this.getKoljadiHandler();
       }
       const databaseRef = firebase.database().ref('randomLyrics');
      if (this.state.koljadi) {
     
      const {first, second} = this.randomGenerator();
        console.log(first, second)
       databaseRef.set({
         first,
         second
        });

     await  databaseRef.on( 'value', data => {this.setState({updatedKoljadiFirebase:data.val()})  })
       
        const { first: f, second: s} =  this.state.updatedKoljadiFirebase;
        let daco =  Object.keys(this.state.koljadi).map( (val, i) => {
            if (val === f || val === s ){
                
                return val
            }
        });

        const filter = daco.filter( element => {
            return element !== undefined
        })

        let koljadi={};
        let newKoljadi={};
       for (const key of filter) {
             koljadi[key] = {...this.state.koljadi[key]}
             newKoljadi = {...koljadi}
        }
        this.setState({updatedKoljadi: {...newKoljadi}})
      }

    
    }

   spinner(){
     
       if (this.state.clicked && !this.state.koljadi) {
           return <Spinner/>
       }
   }
    
    render(){
      
        let koljadi = null;
        if (this.state.updatedKoljadi) {
            console.log('[mrk*********]', this.state.updatedKoljadi)
            koljadi = <Koljadi 
                    koljadi={this.state.updatedKoljadi}
                    />
        }
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

export default Random
