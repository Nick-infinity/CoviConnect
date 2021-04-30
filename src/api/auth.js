import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://bf9d4bd894e2.ngrok.io', // this will change based on ngrok
});

export default instance;
