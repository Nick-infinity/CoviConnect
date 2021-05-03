import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import {
	Input,
	Button,
	Icon,
	ButtonGroup,
	Text,
	CheckBox,
} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ConsentText from '../../components/ConsentText';
import MultiBloodGroupChecker from '../../components/MultiBloodGroupChecker';

import pincodeApi from '../../api/pincode';

import { Context as PlasmaDonorContext } from '../../context/PlasmaDonorContext';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlasmaHospital = ({ navigation }) => {
	/* schmema for object
    plasmaDonorHospital{
        name:
         contact: convert to string
        pin:
        state:
        type
        city:
        availability:status:
        bloddgroups:[]
    }
    */
	// states
	const { postHospitalPlasmaReq } = useContext(PlasmaDonorContext);

	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [pin, setPin] = useState('');
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Not Available'];
	const [valid, SetValid] = useState(-1);
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [area, setArea] = useState('');
	const [btnState, SetBtnState] = useState(true);
	let bloodGroups = [];

	const clearFields = () => {
		setName('');
		setCity('');
		setPin('');
		setState('');
		setContact('');
		setArea('');
		SetAvailability(0);
	};

	//check validity of data on submit
	const isSubmissionValid = () => {
		if (
			name === '' ||
			contact === '' ||
			bloodGroups === [] ||
			bloodGroups.length === 0 ||
			pin === '' ||
			area === '' ||
			state === '' ||
			state === undefined ||
			city === '' ||
			city === undefined ||
			availability === 1
		) {
			return false;
		}
		return true;
	};

	//create a postreqObject

	const createPostReqObject = () => {
		const lowername = name.toLocaleLowerCase();
		const hospitalPlasmaPostReqObject = {
			name: lowername,
			contact,
			pin,
			city,
			area,
			state,
			availability,
			bloodGroups,
			type: 'phospital',
		};

		console.log(hospitalPlasmaPostReqObject);
		return hospitalPlasmaPostReqObject;
	};

	//get state and city from custom api and validate pin
	const pinValidation = async (pincode) => {
		try {
			const response = await pincodeApi.get(`/${pincode}`);
			const status = response.data.Status;
			//console.log(response.data);
			if (status === 'Error') {
				setPin('');
			} else {
				const city = response.data.PostOffice[0].District;
				const state = response.data.PostOffice[0].State;
				const area = response.data.PostOffice[0].Name;
				setCity(city.toLowerCase());
				setState(state.toLowerCase());
				setArea(area);
				//console.log(city, state);
			}
		} catch (e) {
			setPin('');
			//console.log(e);
		}
	};

	// onClick for save button for postt req
	const onSaveClick = async () => {
		const res = isSubmissionValid();
		if (res) {
			SetValid(1);
			SetBtnState(false);
			const hospitalPlasmaPostReqObject = createPostReqObject();
			// call to server for post
			const res = await postHospitalPlasmaReq(hospitalPlasmaPostReqObject);
			if (res) {
				clearFields();
				console.log('Submitted');
				SetBtnState(true);
				navigation.goBack();
			} else if (res === false) {
				SetValid(-2);
				SetBtnState(true);
			}
		} else {
			SetValid(0);
			SetBtnState(true);
			createPostReqObject();
			console.log('Failed to Submit');
		}
	};

	const takeBloodGroupValues = (selectedBloodGroups) => {
		bloodGroups = selectedBloodGroups.filter((bg) => bg !== 'none');

		//	console.log(bloodGroups);
		//console.log(bloodGroups);
	};

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.secondContainer}>
						<Text style={styles.banner}>Hospital Information</Text>
						<View style={styles.formContainer}>
							<View style={styles.fieldContainer}>
								<Input
									placeholder="Enter hospital name"
									label="Hospital Name"
									value={name}
									onChangeText={(t) => setName(t)}
									inputContainerStyle={inputStyle}
									labelStyle={{ fontSize: RFPercentage(2) }}
									inputStyle={{ fontSize: RFPercentage(2.5) }}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter active phone number "
									label="Plasma Helpline"
									value={contact}
									onChangeText={(t) => setContact(t)}
									inputContainerStyle={inputStyle}
									labelStyle={{ fontSize: RFPercentage(2) }}
									inputStyle={{ fontSize: RFPercentage(2.5) }}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter area pincode"
									label="Pincode"
									value={pin}
									onChangeText={(t) => setPin(t)}
									onBlur={() => {
										pinValidation(pin);
									}}
									inputContainerStyle={inputStyle}
									labelStyle={{ fontSize: RFPercentage(2) }}
									inputStyle={{ fontSize: RFPercentage(2.5) }}
								/>
								<Text style={styles.btnGrpBannerStyle}>
									Plasma availability
								</Text>
								<ButtonGroup
									onPress={(num) => {
										SetAvailability(num);
										//console.log(availability);
									}}
									selectedIndex={availability}
									buttons={availabilityOptions}
									containerStyle={btnGroupStyle}
								/>
								<MultiBloodGroupChecker
									takeBloodGroupValues={takeBloodGroupValues}
								/>
							</View>
						</View>
						<ConsentText />
						{valid === 0 ? (
							<Text style={styles.errorMesg}>
								Please fill all fileds with correct information
							</Text>
						) : null}
						{valid === -2 ? (
							<Text style={styles.errorMesg}>
								Error Saving your Application. Please Try Again
							</Text>
						) : null}
						<TouchableOpacity
							disabled={!btnState}
							style={styles.btnStyle}
							onPress={() => {
								onSaveClick();
							}}
						>
							<View style={styles.btnContainer}>
								<Text style={styles.btnTextStyle}>Save</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const btnGroupStyle = {
	marginBottom: windowHeight * 0.026,
	height: windowHeight * 0.052,
	borderRadius: windowWidth * 0.028,
};
const inputStyle = {
	borderBottomWidth: 1,
	borderWidth: 1,
	borderColor: 'gray',
	borderRadius: windowWidth * 0.032,
	paddingHorizontal: windowWidth * 0.04,
	paddingVertical: windowHeight * 0.004,
	marginTop: windowHeight * 0.013,
};

const styles = StyleSheet.create({
	banner: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: RFPercentage(5),
	},
	container: {
		marginTop: windowHeight * 0.052,
	},
	secondContainer: {
		marginBottom: windowHeight * 0.052,
	},
	formContainer: {
		marginHorizontal: windowWidth * 0.02,
		borderRadius: windowWidth * 0.05,
		backgroundColor: 'white',
		marginTop: windowHeight * 0.039,
	},
	fieldContainer: {
		marginTop: windowHeight * 0.039,
		marginBottom: windowHeight * 0.039,
	},
	btnGrpBannerStyle: {
		fontSize: RFPercentage(2),
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: windowWidth * 0.02,
		marginBottom: windowHeight * 0.013,
	},
	btnStyle: {
		borderRadius: windowWidth * 0.05,
	},
	btnContainer: {
		borderWidth: 1,
		borderRadius: windowWidth * 0.05,
		borderColor: 'gray',
		paddingHorizontal: windowWidth * 0.04,
		paddingVertical: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.1,
		alignItems: 'center',
		marginTop: windowHeight * 0.026,
		backgroundColor: '#272727',
	},
	btnTextStyle: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: RFPercentage(3),
	},
	errorMesg: {
		color: 'red',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: windowHeight * 0.007,
		fontSize: RFPercentage(1.7),
	},
});
export default PlasmaHospital;
