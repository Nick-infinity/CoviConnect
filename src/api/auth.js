import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://cc88b79d0fb7.ngrok.io', // this will change based on ngrok
});

export default instance;
