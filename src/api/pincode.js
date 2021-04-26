import axios from 'axios';

export default axios.create({
	baseURL: 'http://www.postalpincode.in/api/pincode/',
});
