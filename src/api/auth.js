import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://myapptracker5.herokuapp.com/', // this will change based on ngrok
});

export default instance;
