import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const instance = axios.create({
	baseURL: 'http://ddf951f52aa6.ngrok.io', // this will change based on ngrok
});

instance.interceptors.request.use(
	async (config) => {
		let token = await AsyncStorage.getItem('token');
		token = token.replace(/^"(.*)"$/, '$1');
		console.log(token);
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
