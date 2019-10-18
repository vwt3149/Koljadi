import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://koljadi.firebaseio.com/'
});

export default instance;