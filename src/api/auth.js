import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://3e360bfd9afe.ngrok.io', // this will change based on ngrok
});

export default instance;
