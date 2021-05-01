import React, { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Input, ButtonGroup, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ConsentText from '../../components/ConsentText';
import pincodeApi from '../../api/pincode';
import { Context as OxygenDonorContext } from '../../context/PlasmaDonorContext';
const OxygenIndividual = ({ navigation }) => {
	/* schmema for object
    oxygenDonorOrganization{
        name:
        age:
        gender:
        contact: convert to string
        pin:
        city
        state
        availability:status:
        donated:
        type
        
    }
    */

	const { postIndividualOxygenReq } = useContext(OxygenDonorContext);
	// states
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [genderIndex, setGenderIndex] = useState();
	const genders = ['Male', 'Female', 'Other'];
	const [contact, setContact] = useState('');
	const [pin, setPin] = useState('');
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Not Available'];
	const [valid, SetValid] = useState(-1);
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [area, setArea] = useState('');

	const clearFields = () => {
		setName('');
		setAge('');
		setGenderIndex();
		setContact('');
		setPin('');
		setCity('');
		setArea('');
		setState('');
		SetAvailability(0);
	};

	//check validity of data on submit
	const isSubmissionValid = () => {
		if (
			name === '' ||
			age === '' ||
			genderIndex === undefined ||
			genderIndex === '' ||
			contact === '' ||
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
		const individualOxygenPostReqObject = {
			name: lowername,
			age,
			gender: genders[genderIndex],
			contact,
			pin,
			area,
			city,
			state,
			donated: 0,
			availability,
			type: 'oIndividual',
		};

		console.log(individualOxygenPostReqObject);
		return individualOxygenPostReqObject;
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
			const individualOxygenPostReqObject = createPostReqObject();
			// call to server for post
			const res = await postIndividualOxygenReq(individualOxygenPostReqObject);
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
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.secondContainer}>
						<Text h2 style={styles.banner}>
							Donor Information
						</Text>

						<View style={styles.formContainer}>
							<View style={styles.fieldContainer}>
								<Input
									placeholder="Enter Provider name"
									label="Provider Name"
									value={name}
									onChangeText={(t) => setName(t)}
									inputContainerStyle={inputStyle}
								/>

								<Input
									keyboardType="numeric"
									placeholder="Enter Provider age "
									label="Provider age"
									value={age}
									onChangeText={(t) => setAge(t)}
									inputContainerStyle={inputStyle}
								/>
								<Text style={styles.btnGrpBannerStyle}>Provider Gender</Text>
								<ButtonGroup
									style={styles.btnGroupStyle}
									onPress={(num) => setGenderIndex(num)}
									selectedIndex={genderIndex}
									buttons={genders}
									containerStyle={btnGroupStyle}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter area pincode"
									label="Pincode"
									value={pin}
									onChangeText={(t) => setPin(t)}
									inputContainerStyle={inputStyle}
									onBlur={() => {
										pinValidation(pin);
									}}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter donor mobile "
									label="Provider Contact"
									value={contact}
									onChangeText={(t) => setContact(t)}
									inputContainerStyle={inputStyle}
								/>

								<Text style={styles.btnGrpBannerStyle}>
									Oxygen availability
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
});
export default OxygenIndividual;

// const styles = StyleSheet.creat({});

// return (
//     <SafeAreaView>
//         <View></View>
//     </SafeAreaView>
// );
