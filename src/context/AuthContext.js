import createDataContext from './createDataContext';
import authApi from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error': {
			return { ...state, errorMessage: action.payload };
		}
		case 'signin':
			return { errorMessage: '', token: action.payload };
		case 'signout':
			return { errorMessage: '', token: null };
		case 'clear_error':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};

//signup
const signup = (dispatch) => {
	return async ({ mobile, email, password }) => {
		// make api request to sigup with email and password
		//if we are signup, modify our state and say we are authenticatedd
		// if sigunup fails , reflect error mesg
		console.log('recieved sigup');

		dispatch({ type: 'clear_error', payload: '' });
		try {
			const response = await authApi.post('/signup', {
				mobile,
				email,
				password,
			});
			//save our token in storage
			await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
			await AsyncStorage.setItem(
				'userId',
				JSON.stringify(response.data.userId)
			);
			dispatch({ type: 'signin', payload: response.data.token });

			// go to main flow
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: 'Check your mobile, email and password',
			});
		}
	};
};

//signin
const signin = (dispatch) => {
	return async ({ mobile, password }) => {
		// make api request to sigin with email and password
		//if we are signin  modify our state and say we are authenticatedd
		// if siguin fails , reflect error mesg
		console.log('recieved sigin');

		dispatch({ type: 'clear_error', payload: '' });
		try {
			const response = await authApi.post('/signin', { mobile, password });
			await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
			await AsyncStorage.setItem(
				'userId',
				JSON.stringify(response.data.userId)
			);
			console.log(response.data.userId);
			dispatch({ type: 'signin', payload: response.data.token });
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: 'Check your mobile and password',
			});
		}
	};
};

//signout
const signout = (dispatch) => {
	return async () => {
		//signout
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('userId');
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
	authReducer,
	{ signin, signout, signup, trylocalSignin },
	{ token: null, errorMessage: '' }
);
