import axios from 'axios';

export default axios.create({
	baseURL: 'http://c685235b0d4e.ngrok.io', // this will change based on ngrok
});
