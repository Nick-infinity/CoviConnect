import axios from 'axios';

export default axios.create({
	baseURL: 'http://1b7f8b15518c.ngrok.io', // this will change based on ngrok
});
