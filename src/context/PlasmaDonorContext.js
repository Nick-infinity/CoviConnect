import createDataContext from './createDataContext';
import pincodeApi from '../api/pincode';
import trackerApi from '../api/tracker';

const plasamaDonorReducer = (state, action) => {
	switch (action.type) {
		case 'postHospitalPlasmaReq':
			return state;
		default:
			return state;
	}
};

// post hospital
const postHospitalPlasmaReq = (dispatch) => {
	return async (hospitalPlasmaPostReqObject) => {
		try {
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/plasma/hospital', {
				hospitalPlasmaPostReqObject,
			});
			const res = response.data;
			console.log('Response', res);
			if (res === 'err') {
				return false;
			}
			dispatch({
				type: 'postHospitalPlasmaReq',
			});

			return true;
		} catch (e) {
			console.log('Error', e);
			return false;
		}
	};
};

// post org
const postOrganizationPlasmaReq = (dispatch) => {
	return async (organizationPlasmaPostReqObject) => {
		try {
			console.log(organizationPlasmaPostReqObject);
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/plasma/organization', {
				organizationPlasmaPostReqObject,
			});

			const res = response.data;
			console.log('Response', res);
			if (res === 'err') {
				return false;
			}
			dispatch({
				type: 'postHospitalPlasmaReq',
			});

			return true;
		} catch (e) {
			console.log('Error', e);
			return false;
		}
	};
};

// post individual
const postIndividualPlasmaReq = (dispatch) => {
	return async (individualPlasmaPostReqObject) => {
		try {
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/plasma/individual', {
				individualPlasmaPostReqObject,
			});
			const res = response.data;
			console.log('Response', res);
			if (res === 'err') {
				return false;
			}
			dispatch({
				type: 'postHospitalPlasmaReq',
			});

			return true;
		} catch (e) {
			console.log('Error', e);
			return false;
		}
	};
};

// //signup
// const signup = (dispatch) => {
// 	return async ({ email, password }) => {
// 		// make api request to sigup with email and password
// 		//if we are signup, modify our state and say we are authenticatedd
// 		// if sigunup fails , reflect error mesg
// 		try {
// 			const response = await trackerApi.post('/signup', { email, password });
// 			//save our token in storage
// 			await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
// 			dispatch({ type: 'signin', payload: response.data.token });
// 			// go to main flow
// 		} catch (err) {
// 			dispatch({
// 				type: 'add_error',
// 				payload: 'Something went wrong with sign up',
// 			});
// 		}
// 	};
// };

// //signin
// const signin = (dispatch) => {
// 	return async ({ email, password }) => {
// 		// make api request to sigin with email and password
// 		//if we are signin  modify our state and say we are authenticatedd
// 		// if siguin fails , reflect error mesg
// 		try {
// 			const response = await trackerApi.post('/signin', { email, password });
// 			await AsyncStorage.setItem('token', JSON.stringify(response.data.token));
// 			dispatch({ type: 'signin', payload: response.data.token });
// 		} catch (err) {
// 			dispatch({
// 				type: 'add_error',
// 				payload: 'Something went wrong with sign in',
// 			});
// 		}
// 	};
// };

// //signout
// const signout = (dispatch) => {
// 	return async () => {
// 		//signout
// 		await AsyncStorage.removeItem('token');
// 		dispatch({ type: 'signout' });
// 	};
// };

// //get token feom local storage
// const trylocalSignin = (dispatch) => {
// 	return async (callback) => {
// 		const token = await AsyncStorage.getItem('token');
// 		token != null ? JSON.parse(token) : null;
// 		if (token) {
// 			dispatch({ type: 'signin', payload: token });
// 		} else {
// 			return callback();
// 		}
// 	};
// };

export const { Provider, Context } = createDataContext(
	plasamaDonorReducer,
	{ postHospitalPlasmaReq, postOrganizationPlasmaReq, postIndividualPlasmaReq },
	{ responseMsg: '' }
);
