import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://6f8a3966e5ce.ngrok.io', // this will change based on ngrok
});

export default instance;
