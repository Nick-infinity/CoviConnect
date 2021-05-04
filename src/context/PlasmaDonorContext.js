import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const plasamaDonorReducer = (state, action) => {
	switch (action.type) {
		case 'postHospitalPlasmaReq':
			return state;

		case 'get_donorList': {
			return { ...state, donorList: action.payload, responseMsg: '' };
		}
		case 'get_donorList_oxygen': {
			return {
				...state,
				donorListOxygen: action.payload,
				oxygenresponseMsg: '',
			};
		}
		case 'get_userPosts':
			return { ...state, userResponseMesg: '', userPosts: action.payload };
		case 'error_msg': {
			return { ...state, responseMsg: action.payload, donorList: [] };
		}
		case 'error_msg_oxygen': {
			return {
				...state,
				oxygenresponseMsg: action.payload,
				donorListOxygen: [],
			};
		}

		case 'error_msg_userposts': {
			return { ...state, userResponseMesg: action.payload, userPosts: [] };
		}
		case 'error_msg_deletpost': {
			return { ...state, deleteErrorMsg: action.payload };
		}

		case 'error_msg_updatepost': {
			return { ...state, updateResponseMesg: action.payload };
		}
		case 'clear_error_msg_userposts': {
			return {
				...state,
				userResponseMesg: action.payload,
			};
		}
		case 'get_usercount': {
			return { ...state, usercount: action.payload };
		}
		case 'error_msg_remdesivir': {
			return {
				...state,
				remdesivirList: [],
				remdesivirErrorMesg: action.payload,
			};
		}
		case 'get_remdesivir': {
			return {
				...state,
				remdesivirErrorMesg: '',
				remdesivirList: action.payload,
			};
		}

		case 'clear_state': {
			return {
				...state,
				userResponseMesg: '',
				responseMsg: '',
				oxygenresponseMsg: '',
				donorList: [],
				donorListOxygen: [],
				userPosts: [],
				deleteErrorMsg: '',
				updateResponseMesg: '',
				remdesivirErrorMesg: '',
				remdesivirList: [],
			};
		}
		default:
			return state;
	}
};
// et req fro donor list
const getDonorListFromCity = (dispatch) => {
	return async (searchCity) => {
		dispatch({ type: 'error_msg', payload: '' });
		console.log(searchCity);
		if (
			searchCity === null ||
			searchCity === undefined ||
			searchCity.length === 0 ||
			searchCity === ''
		) {
			dispatch({ type: 'error_msg', payload: 'Please enter a city name' });
			return;
		}
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
		dispatch({ type: 'error_msg_oxygen', payload: '' });
		console.log(searchCity, 'oxygen');
		if (
			searchCity === null ||
			searchCity === undefined ||
			searchCity === '' ||
			searchCity.length === 0
		) {
			dispatch({
				type: 'error_msg_oxygen',
				payload: `Please enter a city name`,
			});
			return;
		}
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

//get request for dnorDashboard
const getUserPosts = (dispatch) => {
	return async () => {
		console.log('Runnig get for dashboard');
		try {
			//clear error
			dispatch({
				type: 'clear_error_msg_userposts',
				payload: ``,
			});
			let userId = await AsyncStorage.getItem('userId');
			console.log(userId);
			userId = userId.replace(/^"(.*)"$/, '$1');
			console.log(userId);
			const response = await trackerApi.get('/userPosts', {
				params: { userId },
			});
			console.log('From Context screen : ', response.data);
			if (response.data === 'err') {
				dispatch({
					type: 'error_msg_userposts',
					payload: 'Something went wrong. Please try again',
				});
				return;
			}
			const userPosts = response.data;
			if (
				userPosts[0].length === 0 &&
				userPosts[1].length === 0 &&
				userPosts[2].length === 0
			) {
				dispatch({
					type: 'error_msg_userposts',
					payload: `You havent made any donations posts yet.`,
				});
				return;
			}

			//set userPosts from server in my state
			dispatch({ type: 'get_userPosts', payload: userPosts });
			return;
		} catch (e) {
			dispatch({
				type: 'error_msg_userposts',
				payload: 'Something went wrong. Please try again',
			});
			console.log(e);
			return;
		}
	};
};

const deletePost = (dispatch) => {
	return async (_id, type, availabilityType) => {
		console.log('Runnig delete for dashboard');
		try {
			const response = await trackerApi.put('/deleteuserPost', {
				_id,
				type,
				availabilityType,
			});
			console.log('From Context screen : ', response.data);
			if (response.data === 'err') {
				dispatch({
					type: 'error_msg_deletpost',
					payload: 'Something went wrong. Please try deleting  again',
				});
				return;
			}
			if (response.data === 'Deleted Successfully') {
				dispatch({
					type: 'error_msg_deletpost',
					payload: `Deleted Successfully`,
				});
				return;
			}
			return;
		} catch (e) {
			dispatch({
				type: 'error_msg_deletpost',
				payload: 'Something went wrong. Please try deleting again',
			});
			console.log(e);
			return;
		}
	};
};

const updatePost = (dispatch) => {
	return async (_id, type, availabilityType, bloodGroups) => {
		console.log('Runnig delete for dashboard');
		try {
			const response = await trackerApi.put('/updateuserPost', {
				_id,
				type,
				availabilityType,
				bloodGroups,
			});
			console.log('From Context screen : ', response.data);
			if (response.data === 'err') {
				dispatch({
					type: 'error_msg_updatepost',
					payload: 'Something went wrong. Please try deleting  again',
				});
				return;
			}
			if (response.data === 'Updated Successfully') {
				dispatch({
					type: 'error_msg_updatepost',
					payload: ``, //updated successfull
				});
				return true;
			}
			return;
		} catch (e) {
			dispatch({
				type: 'error_msg_updatepost',
				payload: 'Something went wrong. Please try deleting again',
			});
			console.log(e);
			return;
		}
	};
};

const getUserCount = (dispatch) => {
	return async () => {
		console.log('Runnig get count for dashboard');
		try {
			const response = await trackerApi.get('/userCount');
			console.log('From Context screen : ', response.data);
			if (response.data === 'err') {
				return;
			}
			const usercountfromserver = response.data;

			//set userPosts from server in my state
			dispatch({ type: 'get_usercount', payload: usercountfromserver });
			return;
		} catch (e) {
			console.log(e);
			return;
		}
	};
};

//get request for dnorDashboard
const getremdesivir = (dispatch) => {
	return async (city) => {
		console.log(city);
		//clear error
		dispatch({
			type: 'error_msg_remdesivir',
			payload: ``,
		});
		if (
			city === null ||
			city === undefined ||
			city === '' ||
			city.length === 0
		) {
			dispatch({
				type: 'error_msg_remdesivir',
				payload: `Please enter a city name`,
			});
			return;
		}
		console.log('Runnig get remdesivir from context');
		try {
			const response = await trackerApi.get('/remdesivir', {
				params: { city },
			});
			console.log('Waiting for rsposne');
			console.log('From Context screen : ', response.data);
			if (response.data === 'err') {
				dispatch({
					type: 'error_msg_remdesivir',
					payload: 'Something went wrong. Please try again',
				});
				return;
			}
			const remdesivirList = response.data;
			if (remdesivirList.length === 0) {
				dispatch({
					type: 'error_msg_remdesivir',
					payload: `No supplier found in your area`,
				});
				return;
			}

			//set rmdesivirList from server in my state
			dispatch({ type: 'get_remdesivir', payload: remdesivirList });
			return;
		} catch (e) {
			dispatch({
				type: 'error_msg_remdesivir',
				payload: 'Something went wrong. Please try again',
			});
			console.log(e);
			return;
		}
	};
};

// post org
const postRemdesivirReq = (dispatch) => {
	return async (remdesivirPostObject) => {
		try {
			console.log('At context');
			console.log(remdesivirPostObject);
			// console.log(plasmaDonorInfo);
			const response = await trackerApi.post('/remdesivir', {
				remdesivirPostObject,
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

const resetStateOnSignout = (dispatch) => {
	return async () => {
		console.log('Clearing state on logout');

		dispatch({ type: 'clear_state' });
	};
};

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
		getUserPosts,
		deletePost,
		updatePost,
		getUserCount,
		resetStateOnSignout,
		getremdesivir,
		postRemdesivirReq,
	},
	{
		userResponseMesg: '',
		responseMsg: '',
		oxygenresponseMsg: '',
		donorList: [],
		donorListOxygen: [],
		userPosts: [],
		usercount: [],
		deleteErrorMsg: '',
		updateResponseMesg: '',
		remdesivirList: [],
		remdesivirErrorMesg: '',
	}
);
