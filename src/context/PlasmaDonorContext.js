import createDataContext from './createDataContext';
import pincodeApi from '../api/pincode';
import trackerApi from '../api/tracker';

const plasamaDonorReducer = (state, action) => {
	switch (action.type) {
		case 'postHospitalPlasmaReq':
			return state;

		case 'get_donorList': {
			return { donorList: action.payload };
		}
		case 'get_donorList_oxygen': {
			return { donorListOxygen: action.payload };
		}
		case 'error_msg': {
			return { ...state, responseMsg: action.payload };
		}
		case 'error_msg_oxygen': {
			return { ...state, responseMsg: action.payload };
		}
		default:
			return state;
	}
};
// et req fro donor list
const getDonorListFromCity = (dispatch) => {
	return async (searchCity) => {
		//clear error
		dispatch({
			type: 'error_msg',
			payload: '',
		});
		console.log(searchCity);
		try {
			const response = await trackerApi.get('/plasma', {
				params: { searchCity: searchCity },
			});
			console.log('Sent get request');
			console.log(response.data);
			if (response.data === 'err') {
				dispatch({
					type: 'error_msg',
					payload: 'Something went wrong. Please try again',
				});
				return;
			}
			const plasmaListArray = response.data;
			if (
				plasmaListArray[0].length === 0 &&
				plasmaListArray[1].length === 0 &&
				plasmaListArray[2].length === 0
			) {
				dispatch({
					type: 'error_msg',
					payload: `Cant find donors in your area.\n Enter proper city name or try with nearby city.`,
				});
				return;
			}
			// resposne.data === [[{}...],[{}..],[{}...]]
			dispatch({ type: 'get_donorList', payload: response.data });
			return;
		} catch (e) {
			dispatch({
				type: 'error_msg',
				payload: 'Something went wrong. Please try again',
			});
			console.log(e);
			return;
		}
	};
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

///////////OXYGEN?///////////////

const getOxygenDonorListFromCity = (dispatch) => {
	return async (searchCity) => {
		//clear error
		dispatch({
			type: 'error_msg_oxygen',
			payload: '',
		});
		console.log(searchCity, 'oxygen');
		try {
			const response = await trackerApi.get('/oxygen', {
				params: { searchCity: searchCity },
			});
			console.log('Sent get request');
			console.log(response.data);
			if (response.data === 'err') {
				dispatch({
					type: 'error_msg_oxygen',
					payload: 'Something went wrong. Please try again',
				});
				return;
			}
			const oxygenListArray = response.data;
			if (
				oxygenListArray[0].length === 0 &&
				oxygenListArray[1].length === 0 &&
				oxygenListArray[2].length === 0
			) {
				dispatch({
					type: 'error_msg_oxygen',
					payload: `Cant find donors in your area.\n Enter proper city name or try with nearby city.`,
				});
				return;
			}
			// resposne.data === [[{}...],[{}..],[{}...]]
			dispatch({ type: 'get_donorList_oxygen', payload: response.data });
			return;
		} catch (e) {
			dispatch({
				type: 'error_msg_oxygen',
				payload: 'Something went wrong. Please try again',
			});
			console.log(e);
			return;
		}
	};
};

// post hospital
const postHospitalOxygenReq = (dispatch) => {
	return async (hospitalOxygenPostReqObject) => {
		console.log('At context');
		console.log(hospitalOxygenPostReqObject);
		try {
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/oxygen/hospital', {
				hospitalOxygenPostReqObject,
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
const postOrganizationOxygenReq = (dispatch) => {
	return async (organizationOxygenPostReqObject) => {
		try {
			console.log('At context');
			console.log(organizationOxygenPostReqObject);
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/oxygen/organization', {
				organizationOxygenPostReqObject,
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
const postIndividualOxygenReq = (dispatch) => {
	return async (individualOxygenPostReqObject) => {
		try {
			console.log('At context');
			console.log(individualOxygenPostReqObject);
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/oxygen/individual', {
				individualOxygenPostReqObject,
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
	{
		postHospitalPlasmaReq,
		postOrganizationPlasmaReq,
		postIndividualPlasmaReq,
		getDonorListFromCity,
		postHospitalOxygenReq,
		postOrganizationOxygenReq,
		postIndividualOxygenReq,
		getOxygenDonorListFromCity,
	},
	{ responseMsg: '', oxygenresponseMsg: '', donorList: [], donorListOxygen: [] }
);
