import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://aaa8fb45e638.ngrok.io', // this will change based on ngrok
});

export default instance;
