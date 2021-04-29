import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://af2e22e63877.ngrok.io', // this will change based on ngrok
});

export default instance;
