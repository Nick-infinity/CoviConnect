import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const instance = axios.create({
	baseURL: 'http://8dea3cf3706e.ngrok.io', // this will change based on ngrok
});

instance.interceptors.request.use(
	async (config) => {
		let token = await AsyncStorage.getItem('token');
		//	console.log(token);
		token = token.replace(/^"(.*)"$/, '$1');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default instance;
