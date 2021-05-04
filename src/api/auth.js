import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://16f8f75c8b27.ngrok.io', // this will change based on ngrok
});

export default instance;
