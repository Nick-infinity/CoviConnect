import axios from 'axios';

const instance = axios.create({
	baseURL: ' http://a5ea066e9540.ngrok.io', // this will change based on ngrok
});

export default instance;
