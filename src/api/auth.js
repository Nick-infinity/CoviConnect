import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://5f4a63f75d82.ngrok.io', // this will change based on ngrok
});

export default instance;
