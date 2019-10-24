import React, { Component } from 'react';

import Koljadi from '../../components/Koljadi/Koljadi';
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from '../../axios/axios';
import * as firebase from 'firebase';
// import * as firebase from '../../../../node_modules/@firebase';
import './Random.css';
class Random extends Component{

    state = {
        koljadi:null,
        isLoading:false,
        updatedKoljadi:null,
        clicked:false
    }

    async componentDidMount(){
        this.setState({
            isLoading:true
            
        })
            try {
                const response = await axios.get('/lyrics.json');
                this.setState({
                    koljadi: response.data,
                    isLoading: false,
                    // clicked:false
                })
       
            } catch (error) {
                this.setState({isLoading: false})
                console.log(error);
            }
            
                this.randomKoljadiGenerator = async () => {
                // this.setState({clicked: true});
                // // this.setState({updatedKoljadi: null})
                // const {first, second} = this.randomGenerator()

                // let daco =  Object.keys(this.state.koljadi).map( (val, i) => {
                //     if (i === first || i === second ){
                //         return val
                //     }
                // })
                // const filter = daco.filter( element => {
                //     return element !== undefined
                // })

                // let oldKoljadi={};
                // let newKoljadi={};
                // for (const key of filter) {
                //      oldKoljadi[key] = {...this.state.koljadi[key]}
                //      newKoljadi = {...oldKoljadi}
                //     this.setState({updatedKoljadi: {...newKoljadi}})
                // }
            }
            
    }

 

        randomGenerator = () =>{
        const koljadiLength = Object.getOwnPropertyNames(this.state.koljadi).length;
        let generete = () =>{
            let generateFirst, generateSecond;
            do{
                 generateFirst = Math.floor(Math.random() * koljadiLength);
                 generateSecond = Math.floor(Math.random() * koljadiLength);
            }
            while (generateFirst === generateSecond) 
         
            return {
                first: generateFirst,
                second: generateSecond
            }
        }
        
       return generete()
        
    }
  

     randomKoljadiClickHandler(){
        // this.randomKoljadiGenerator();
      if (this.state.koljadi) {
        // this.setState({updatedKoljadi: null})
        const {first, second} = this.randomGenerator()

        let daco =  Object.keys(this.state.koljadi).map( (val, i) => {
            if (i === first || i === second ){
                return val
            }
        })

        const filter = daco.filter( element => {
            return element !== undefined
        })

        let oldKoljadi={};
        let newKoljadi={};
        for (const key of filter) {
             oldKoljadi[key] = {...this.state.koljadi[key]}
             newKoljadi = {...oldKoljadi}
            this.setState({updatedKoljadi: {...newKoljadi}})
        }
      }
    }
    
    render(){
        let koljadi = <Spinner/>
        if (this.state.updatedKoljadi) {
            koljadi = <Koljadi
                        koljadi={this.state.updatedKoljadi}
                        />
        }
        console.log(this.state.clicked)
        window.scrollTo({top: 0})
        return(
            
            <section className='Random'>
                    {this.state.clicked? koljadi : null}
                    <div className='PressButton'>
                        <h2>Press button for random Koljadi</h2>
                        <button onClick={ () => {
                            this.randomKoljadiClickHandler()
                            this.setState({clicked: true})
                            if(!this.state.koljadi)this.componentDidMount()
                            }}>Press</button>
                    </div>
                 
            </section>
          
        );
    }
}

export default Random
