import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://d44d37da3cb8.ngrok.io', // this will change based on ngrok
});

export default instance;
