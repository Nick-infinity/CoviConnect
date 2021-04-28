import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button, Icon, ButtonGroup, Text } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import ConsentText from '../../components/ConsentText';
import MultiBloodGroupChecker from '../../components/MultiBloodGroupChecker';

const PlasmaOrganization = () => {
	/* schmema for object
    plasmaDonorOrganization{
        name:
        contact: convert to string
        contact2: convert to string
        pin:
        state:
        city:
        availability:status:
        consent
        bloddgroups:[]
    }
    */
	// states
	const [name, setName] = useState('');
	const [contact, setContact] = useState('');
	const [contact2, setContact2] = useState('');
	const [pin, setPin] = useState('');
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Not Available'];

	//check validity of data on submit
	const isValid = (value, setValue) => {};

	//get state and city from custom api and validate pin
	const isPinValid = () => {};

	// onClick for save button
	const onSaveClick = () => {};

	// get bloodgroups from checker
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
						<TouchableOpacity style={styles.btnStyle}>
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
});
export default PlasmaOrganization;

// const styles = StyleSheet.creat({});

// return (
//     <SafeAreaView>
//         <View></View>
//     </SafeAreaView>
// );
