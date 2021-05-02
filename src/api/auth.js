import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://f977ccc0edba.ngrok.io', // this will change based on ngrok
});

export default instance;
