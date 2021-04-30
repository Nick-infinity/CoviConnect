import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://f6b7c21b4cd5.ngrok.io', // this will change based on ngrok
});

export default instance;
