import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error': {
			return { ...state, errorMessage: action.payload };
		}
		case 'signin':
			return { errorMessage: '', token: action.payload };
		// case 'signout':
		// 	return { errorMessage: '', token: null };
		default:
			return state;
	}
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
		// await AsyncStorage.removeItem('token');
		// dispatch({ type: 'signout' });
	};
};

//get token feom local storage
const trylocalSignin = (dispatch) => {
	return async (callback) => {
		const token = await AsyncStorage.getItem('token');
		token != null ? JSON.parse(token) : null;
		if (token) {
			dispatch({ type: 'sigin', payload: token });
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
