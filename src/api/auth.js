import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://48e1975f3f61.ngrok.io', // this will change based on ngrok
});

export default instance;
