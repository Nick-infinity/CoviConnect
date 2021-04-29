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

const PlasmaOrganization = ({ navigation }) => {
	/* schmema for object
    plasmaDonorOrganization{
        name:
        contact: convert to string
        contact2: convert to string
        pin:
        state:
        type
        city:
        availability:status:
        bloddgroups:[]
    }
    */
	// states

	const { postOrganizationPlasmaReq } = useContext(PlasmaDonorContext);

	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [contact2, setContact2] = useState('');
	const [pin, setPin] = useState('');
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Not Available'];
	const [valid, SetValid] = useState(-1);
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	let bloodGroups = [];

	const clearFields = () => {
		setName('');
		setCity('');
		setPin('');
		setState('');
		setContact('');
		setContact2('');
		SetAvailability(0);
	};

	//check validity of data on submit
	const isSubmissionValid = () => {
		if (
			name === '' ||
			contact === '' ||
			contact2 === '' ||
			bloodGroups.length === 0 ||
			bloodGroups === [] ||
			pin === '' ||
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

	const takeBloodGroupValues = (selectedBloodGroups) => {
		bloodGroups = selectedBloodGroups.filter((bg) => bg !== 'none');

		//	console.log(bloodGroups);
		//console.log(bloodGroups);
	};

	const createPostReqObject = () => {
		const lowername = name.toLocaleLowerCase();
		const organizationPlasmaPostReqObject = {
			name: lowername,
			contact,
			contact2,
			pin,
			city,
			state,
			availability,
			bloodGroups,
			type: 'pOrganization',
		};

		console.log(organizationPlasmaPostReqObject);
		return organizationPlasmaPostReqObject;
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
				setCity(city.toLowerCase());
				setState(state.toLowerCase());
			}
		} catch (e) {
			setPin('');
			//console.log(e);
		}
	};
	//organizationPlasmaPostReqObject;
	//   postOrganizationPlasmaReq
	// onClick for save button for postt req
	const onSaveClick = async () => {
		const res = isSubmissionValid();
		if (res) {
			SetValid(1);
			const organizationPlasmaPostReqObject = createPostReqObject();
			// call to server for post
			const res = await postOrganizationPlasmaReq(
				organizationPlasmaPostReqObject
			);
			if (res) {
				clearFields();
				console.log('Submitted');
				navigation.goBack();
			} else if (res === false) {
				SetValid(-2);
			}
		} else {
			SetValid(0);
			createPostReqObject();
			console.log('Failed to Submit');
		}
	};

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.secondContainer}>
						<Text h2 style={styles.banner}>
							Organization Information
						</Text>
						<View style={styles.formContainer}>
							<View style={styles.fieldContainer}>
								<Input
									placeholder="Enter organization name"
									label="Organization Name"
									value={name}
									onChangeText={(t) => setName(t)}
									inputContainerStyle={inputStyle}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter active phone number "
									label="Representative Contact"
									value={contact}
									onChangeText={(t) => setContact(t)}
									inputContainerStyle={inputStyle}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Secondary phone number "
									label="Secondary Contact"
									value={contact2}
									onChangeText={(t) => setContact2(t)}
									inputContainerStyle={inputStyle}
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
								/>
								<Text style={styles.btnGrpBannerStyle}>
									Plasma availability
								</Text>
								<ButtonGroup
									style={styles.btnGroupStyle}
									onPress={(num) => SetAvailability(num)}
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
						<TouchableOpacity
							style={styles.btnStyle}
							onPress={() => onSaveClick()}
						>
							<View style={styles.btnContainer}>
								<Text h4 style={styles.btnTextStyle}>
									Save
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const btnGroupStyle = {
	marginBottom: 20,
	height: 40,
	borderRadius: 12,
};
const inputStyle = {
	borderBottomWidth: 1,
	borderWidth: 1,
	borderColor: 'gray',
	borderRadius: 15,
	paddingHorizontal: 10,
	paddingVertical: 5,
	marginTop: 10,
};

const styles = StyleSheet.create({
	banner: {
		textAlign: 'center',
	},
	container: {
		marginTop: 70,
	},
	secondContainer: {
		marginBottom: 40,
	},
	formContainer: {
		marginHorizontal: 10,
		borderRadius: 20,
		backgroundColor: 'white',
		marginTop: 30,
	},
	fieldContainer: {
		marginTop: 30,
		marginBottom: 30,
	},
	btnGrpBannerStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: 10,
		marginBottom: 10,
	},
	btnStyle: {
		borderRadius: 20,
	},
	btnContainer: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: 'gray',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginHorizontal: 40,
		alignItems: 'center',
		marginTop: 20,
		backgroundColor: '#272727',
	},
	btnTextStyle: {
		color: 'white',
	},
	errorMesg: {
		color: 'red',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 5,
	},
	btnContainerTop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	btnContainerBottom: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginHorizontal: 5,
	},
	btnContainer2: {},
	checkBoxStyle: {},
});

export default PlasmaOrganization;

// const styles = StyleSheet.creat({});

// return (
//     <SafeAreaView>
//         <View></View>
//     </SafeAreaView>
// );
