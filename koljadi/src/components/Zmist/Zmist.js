import React from 'react';

import ZmistItem from './ZmistItem/ZmistItem';
import './Zmist.css';

const zmist = (props) => {

        let zmistItems = '';
        if (props.koljadi !== null) {
            zmistItems =  Object.keys(props.koljadi).map( (val, ind) => {
             return  <ZmistItem
                        id={val}
                        clicked={props.clicked}
                        key={props.koljadi[val].title}
                        title={`${ind + 1}. ${props.koljadi[val].title}`}/>
           })
        }
    

    return(
        <section className='Zmist'>
            
            <h3>Zmist:</h3>
            <ul>
             {zmistItems}
            </ul>
        </section>
    );
}

export default zmist;
