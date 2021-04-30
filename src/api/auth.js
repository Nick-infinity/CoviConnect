import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://8dea3cf3706e.ngrok.io', // this will change based on ngrok
});

export default instance;
