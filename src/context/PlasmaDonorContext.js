import createDataContext from './createDataContext';
import pincodeApi from '../api/pincode';
import trackerApi from '../api/tracker';

const plasamaDonorReducer = (state, action) => {
	switch (action.type) {
		case 'postDonorInfo':
			return { errorMessage: '', tofind: '', plasmaDonorInfo: action.payload };
		default:
			return state;
	}
};

const postPlasmainfo = (dispatch) => {
	return async (plasmaDonorInfo) => {
		try {
			console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/plasma', { plasmaDonorInfo });
			console.log(response.data);
			// await AsyncStorage.setItem(
			// 	'donorInfo',
			// 	JSON.stringify(response.data.token)
			// );
			dispatch({ type: 'postDonorInfo', payload: plasmaDonorInfo });
		} catch (e) {
			console.log(e);
		}
	};
};

//signup
const signup = (dispatch) => {
	return async ({ email, password }) => {
		// make api request to sigup with email and password
		//if we are signup, modify our state and say we are authenticatedd
		// if sigunup fails , reflect error mesg
		try {
			const response = await trackerApi.post('/signup', { email, password });
			//save our token in storage
			await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
			dispatch({ type: 'signin', payload: response.data.token });
			// go to main flow
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: 'Something went wrong with sign up',
			});
		}
	};
};

//signin
const signin = (dispatch) => {
	return async ({ email, password }) => {
		// make api request to sigin with email and password
		//if we are signin  modify our state and say we are authenticatedd
		// if siguin fails , reflect error mesg
		try {
			const response = await trackerApi.post('/signin', { email, password });
			await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
			dispatch({ type: 'signin', payload: response.data.token });
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: 'Something went wrong with sign in',
			});
		}
	};
};

//signout
const signout = (dispatch) => {
	return async () => {
		//signout
		await AsyncStorage.removeItem('token');
		dispatch({ type: 'signout' });
	};
};

//get token feom local storage
const trylocalSignin = (dispatch) => {
	return async (callback) => {
		const token = await AsyncStorage.getItem('token');
		token != null ? JSON.parse(token) : null;
		if (token) {
			dispatch({ type: 'signin', payload: token });
		} else {
			return callback();
		}
	};
};

export const { Provider, Context } = createDataContext(
	plasamaDonorReducer,
	{ postPlasmainfo },
	{ plasmaDonorInfo: null }
);
