import React, { useState } from 'react';
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

const PlasmaHospital = () => {
	/* schmema for object
    plasmaDonorHospital{
        name:
         contact: convert to string
        pin:
        availability:status:
        consent
        bloddgroups:[]
    }
    */
	// states
	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [pin, setPin] = useState('');
	const [consent, SetConsent] = useState(false);
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Not Available'];

	//check validity of data on submit
	const isValid = (value, setValue) => {};

	//get state and city from custom api and validate pin
	const isPinValid = () => {};

	// onClick for save button
	const onSaveClick = () => {};

	takeBloodGroupValues = (selectedBloodGroups) => {
		bloodGroups = selectedBloodGroups.filter((bg) => bg !== 'none');
		console.log(bloodGroups);
	};

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.secondContainer}>
						<Text h2 style={styles.banner}>
							Hospital Information
						</Text>
						<View style={styles.formContainer}>
							<View style={styles.fieldContainer}>
								<Input
									placeholder="Enter hospital name"
									label="Hospital Name"
									value={name}
									onChangeText={(t) => setName(t)}
									inputContainerStyle={inputStyle}
								/>
								<Input
									placeholder="Enter active phone number "
									label="Plasma Helpline"
									value={contact}
									onChangeText={(t) => setContact(t)}
									inputContainerStyle={inputStyle}
								/>
								<Input
									keyboardType="numeric"
									placeholder="Enter area pincode"
									label="Pincode"
									value={pin}
									onChangeText={(t) => setPin(t)}
									inputContainerStyle={inputStyle}
								/>
								<Text style={styles.btnGrpBannerStyle}>
									Plasma availability
								</Text>
								<ButtonGroup
									style={styles.btnGroupStyle}
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
								{/* <Text style={styles.btnGrpBannerStyle}>
									Available bloodgroups
								</Text>
								<ButtonGroup
									selectMultiple
									onPress={(num) => {
										setBloodGroup(num);
										//console.log(bloodGroup);
									}}
									selectMultiple={true}
									selectedIndex={bloodGroup}
									buttons={bloodGroups}
									containerStyle={btnGroupStyle}
								/> */}
							</View>
						</View>
						<ConsentText />
						<TouchableOpacity
							style={styles.btnStyle}
							onPress={() => console.log(bloodGroup)}
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
		alignSelf: 'center',
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
});
export default PlasmaHospital;

// const styles = StyleSheet.creat({});

// return (
//     <SafeAreaView>
//         <View></View>
//     </SafeAreaView>
// );
