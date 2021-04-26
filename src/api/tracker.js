import axios from 'axios';

export default axios.create({
	baseURL: 'http://5bb2044ac593.ngrok.io', // this will change based on ngrok
});
