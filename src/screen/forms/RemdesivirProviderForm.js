import React, { useState, useContext } from 'react';
import { TouchableOpacity, Vibration } from 'react-native';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Input, ButtonGroup, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ConsentText from '../../components/ConsentText';
import pincodeApi from '../../api/pincode';
import { Context as RemdesivirDonorContext } from '../../context/PlasmaDonorContext';

// for showinf saved toast
import { ToastMsg } from '../../components/ToastMsg';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RemdesivirProviderForm = ({ navigation }) => {
	/* schmema for object
    oxygenDonorOrganization{
        name:
        contact: convert to string
        contact2: convert to string
        pin:
        state:
        type
        city:
        availability:status:
       
    }
    */
	// states

	const { postRemdesivirReq } = useContext(RemdesivirDonorContext);

	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [contact2, setContact2] = useState('');
	const [pin, setPin] = useState('');
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Not Available'];
	const [valid, SetValid] = useState(-1);
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [area, setArea] = useState('');
	const [location, setLocation] = useState('');
	const [btnState, SetBtnState] = useState(true);

	const clearFields = () => {
		setName('');
		setCity('');
		setPin('');
		setState('');
		setContact('');
		setArea('');
		setLocation('');
		setContact2('');
		SetAvailability(0);
	};

	//check validity of data on submit
	const isSubmissionValid = () => {
		if (
			name === '' ||
			contact === '' ||
			contact2 === '' ||
			pin === '' ||
			location === '' ||
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

	const createPostReqObject = () => {
		const lowername = name.toLocaleLowerCase();
		const remdesivirPostObject = {
			name: lowername,
			contact,
			contact2,
			pin,
			area,
			email: 'none',
			city,
			state,
			location,
			type: 'remdesivirProvider',
			availability,
		};

		console.log(remdesivirPostObject);
		return remdesivirPostObject;
	};

	//get state and city from custom api and validate pin
	const pinValidation = async (pincode) => {
		try {
			const response = await pincodeApi.get(`/${pincode}`);
			const status = await response.data.Status;
			//console.log(response.data);
			if (status === 'Error') {
				setPin('');
			} else {
				const city = response.data.PostOffice[0].District;
				const state = response.data.PostOffice[0].State;
				const area = response.data.PostOffice[0].Name;
				setCity(city);
				setState(state.toLowerCase());
				setArea(area);
				//console.log(city, state);
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
		Vibration.vibrate(20);
		const res = isSubmissionValid();
		if (res) {
			SetValid(1);
			SetBtnState(false);
			const remdesivirPostObject = createPostReqObject();
			// call to server for post
			const res = await postRemdesivirReq(remdesivirPostObject);
			if (res) {
				clearFields();
				ToastMsg('Saved Successfully');
				console.log('Submitted');
				SetBtnState(true);
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

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.secondContainer}>
						<Text style={styles.banner}>Information</Text>
						<View style={styles.formContainer}>
							<View style={styles.fieldContainer}>
								<Input
									placeholder="Enter name"
									label="Provider Name"
									value={name}
									onChangeText={(t) => setName(t)}
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
								<Input
									placeholder="Enter address"
									label="Address"
									value={location}
									onChangeText={(t) => setLocation(t)}
									inputContainerStyle={inputStyle}
									labelStyle={{ fontSize: RFPercentage(2) }}
									inputStyle={{ fontSize: RFPercentage(2.5) }}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter active phone number "
									label="Representative Contact"
									value={contact}
									onChangeText={(t) => setContact(t)}
									inputContainerStyle={inputStyle}
									labelStyle={{ fontSize: RFPercentage(2) }}
									inputStyle={{ fontSize: RFPercentage(2.5) }}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Secondary phone number "
									label="Secondary Contact"
									value={contact2}
									onChangeText={(t) => setContact2(t)}
									inputContainerStyle={inputStyle}
									labelStyle={{ fontSize: RFPercentage(2) }}
									inputStyle={{ fontSize: RFPercentage(2.5) }}
								/>

								<Text style={styles.btnGrpBannerStyle}>
									Remdesivir availability
								</Text>
								<ButtonGroup
									style={styles.btnGroupStyle}
									onPress={(num) => SetAvailability(num)}
									selectedIndex={availability}
									buttons={availabilityOptions}
									containerStyle={btnGroupStyle}
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
							disabled={!btnState}
							style={styles.btnStyle}
							onPress={() => onSaveClick()}
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
	borderRadius: windowWidth * 0.03,
};
const inputStyle = {
	borderBottomWidth: 1,
	borderWidth: 1,
	borderColor: 'gray',
	borderRadius: windowWidth * 0.04,
	paddingHorizontal: windowWidth * 0.02,
	paddingVertical: windowHeight * 0.004,
	marginTop: windowHeight * 0.013,
	marginBottom: -windowHeight * 0.013,
};

const styles = StyleSheet.create({
	banner: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: RFPercentage(5),
	},
	container: {
		borderRadius: windowWidth * 0.05,
	},
	secondContainer: {
		borderRadius: windowWidth * 0.05,
		marginBottom: windowHeight * 0.052,
	},
	formContainer: {
		borderRadius: windowWidth * 0.05,
		backgroundColor: 'white',
		marginTop: 0,
	},
	fieldContainer: {
		borderRadius: windowWidth * 0.05,
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
	btnContainerTop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	btnContainerBottom: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginHorizontal: windowWidth * 0.01,
	},
	btnContainer2: {},
	checkBoxStyle: {},
});

export default RemdesivirProviderForm;

// const styles = StyleSheet.creat({});

// return (
//     <SafeAreaView>
//         <View></View>
//     </SafeAreaView>
// );
