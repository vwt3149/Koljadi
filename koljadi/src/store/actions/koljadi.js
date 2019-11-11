import axios from '../../axios/axios';
import {
    ON_GET_KOLJADI_START,
    ON_GET_KOLJADI_SUCCESS,
    ON_GET_KOLJADI_FAIL
} from '../actions/actionTypes';

const ENDPOINT = {
       KOLJADI: '/lyrics.json'
}
const onGetKoljadiStart = () => {
    return{
        type:ON_GET_KOLJADI_START,
        error: null
    }
}
const onGetKoljadiSuccess = (koljadi) => {
    return{
        type:ON_GET_KOLJADI_SUCCESS,
        koljadi,
        error: null
    }
}
const onGetKoljadiFail= (error) => {
    return{
        type:ON_GET_KOLJADI_FAIL,
        error
    }
}
 
export const onGetKoljadi= () => {
   return async dispatch => {
    try {
        dispatch(onGetKoljadiStart())
        const response = await axios.get(ENDPOINT.KOLJADI);
        const{data} = response
        dispatch(onGetKoljadiSuccess(data))
        console.log(data)
    } catch (error) {
        dispatch(onGetKoljadiFail(error.response));
        console.log(error.response)
    }
   }
}