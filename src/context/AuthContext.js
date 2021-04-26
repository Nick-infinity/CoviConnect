import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error': {
			return { ...state, errorMessage: action.payload };
		}
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
			console.log(response.data);
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
	return ({ email, password }) => {
		// make api request to sigin with email and password
		//if we are signin  modify our state and say we are authenticatedd
		// if siguin fails , reflect error mesg
	};
};

//signout
const signout = (dispatch) => {
	return () => {
		//signout
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup },
	{ isSignedIn: false, errorMessage: '' }
);
