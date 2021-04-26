import axios from 'axios';

export default axios.create({
	baseURL: 'http://778d3359784d.ngrok.io', // this will change based on ngrok
});
