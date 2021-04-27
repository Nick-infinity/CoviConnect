import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button, Icon, ButtonGroup } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { ScrollView } from 'react-native';
import pincodeApi from '../api/pincode';
import { Context as PlasmaDonorContext } from '../context/PlasmaDonorContext';
import { Provider as PlasmaDonorProvider } from '../context/PlasmaDonorContext';
const PlasmaDonorScreen = () => {
	const [genderIndex, setGenderIndex] = useState('');
	const genders = ['Male', 'Female', 'Not to say'];
	const [bloodGroup, setBloodGroup] = useState('');
	const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

	// for fields
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [contact, setContact] = useState('');
	const [pincode, setPincode] = useState('');
	const [dstate, setDState] = useState('');
	const [city, setcity] = useState('');
	const [recovery, setRecovery] = useState('');

	const { postPlasmainfo } = useContext(PlasmaDonorContext);
	//get city and state from pin code
	const getPincode = async (pincode) => {
		try {
			const response = await pincodeApi.get(`/${pincode}`);
			const status = response.data.Status;
			//console.log(response.data);
			if (status === 'Error') {
				setPincode('Invalid PinCode');
				setcity('');
				setDState('');
			} else {
				const city = response.data.PostOffice[0].District;
				const dstate = response.data.PostOffice[0].State;
				setcity(city);
				setDState(dstate);
			}
		} catch (e) {
			console.log(e);
		}
	};

	// makeSatteObject
	const makeSateObject = () => {
		const nbloodGroup = bloodGroups[bloodGroup];
		const nGender = genders[genderIndex];
		const plasmaDonorInfo = {
			name,
			age,
			gender: nGender,
			contact,
			pincode,
			state: dstate,
			city,
			bgroup: nbloodGroup,
			recovery,
			consent: true,
		};
		return plasmaDonorInfo;
	};

	// clear allfields
	const clearFields = () => {
		setBloodGroup('');
		setGenderIndex('');
		setName('');
		setAge('');
		setcity('');
		setPincode('');
		setDState('');
		setContact('');
		setRecovery('');
	};

	const allFieldsSet = () => {
		if (
			name === '' ||
			age === '' ||
			contact === '' ||
			genderIndex === '' ||
			bloodGroup === '' ||
			pincode === '' ||
			dstate === '' ||
			city === '' ||
			recovery === ''
		) {
			return false;
		}
		return true;
	};

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ flex: 1, marginBottom: 20 }}>
					<Text
						style={{
							marginTop: 20,
							fontSize: 20,
							fontWeight: 'bold',
							color: 'black',
							textAlign: 'center',
							backgroundColor: '#ff6961',
							paddingVertical: 5,
						}}
					>
						Please fill this form carefully
					</Text>
					<Spacer></Spacer>
					<Input
						placeholder="Enter Donor Name"
						style={styles.inputStyle}
						label="Name"
						value={name}
						onChangeText={(text) => setName(text)}
					/>
					<Input
						keyboardType="numeric"
						placeholder="Enter Donor Age"
						style={styles.inputStyle}
						label="Age"
						value={age}
						onChangeText={(text) => setAge(text)}
					/>
					<Text
						style={{
							fontSize: 16,
							fontWeight: 'bold',
							color: 'gray',
							marginLeft: 10,
						}}
					>
						Gender
					</Text>
					<ButtonGroup
						label="Donor Gender"
						onPress={(num) => setGenderIndex(num)}
						selectedIndex={genderIndex}
						buttons={genders}
						containerStyle={{ height: 30 }}
					/>
					<View style={{ marginTop: 15 }}></View>
					<Input
						keyboardType="numeric"
						placeholder="Enter Donor Mobile"
						style={styles.inputStyle}
						label="Contact Number"
						value={contact}
						onChangeText={(text) => setContact(text)}
					/>

					<Input
						keyboardType="numeric"
						placeholder="Enter Address Pincode"
						style={styles.inputStyle}
						label="Pincode"
						value={pincode}
						onSubmitEditing={() => {
							getPincode(pincode);
						}}
						onChangeText={(text) => {
							setPincode(text);
						}}
					/>
					<Input
						placeholder="State"
						style={styles.inputStyle}
						label="State"
						value={dstate}
						onChangeText={(text) => setDState(text)}
					/>
					<Input
						placeholder="City"
						style={styles.inputStyle}
						label="City"
						value={city}
						onChangeText={(text) => setcity(text)}
					/>

					<Text
						style={{
							fontSize: 16,
							fontWeight: 'bold',
							color: 'gray',
							marginLeft: 10,
						}}
					>
						Donor Blood Group
					</Text>
					<ButtonGroup
						onPress={(text) => setBloodGroup(text)}
						selectedIndex={bloodGroup}
						buttons={bloodGroups}
						containerStyle={{ height: 30 }}
					/>
					<View style={{ marginTop: 15 }}></View>
					<Input
						placeholder="DD/MM/YY"
						style={styles.inputStyle}
						label="Date of recovery from Covid-19"
						value={recovery}
						onChangeText={(text) => setRecovery(text)}
					/>
					<Text
						style={{
							color: 'gray',
							fontSize: 14,
							fontWeight: 'bold',
							textAlign: 'center',
						}}
					>
						I give my consent to display & store the above provided information
						by pressing on "Apply For Donation" button
					</Text>
					<Spacer></Spacer>
					<Button
						title="Apply For Donation"
						onPress={() => {
							if (allFieldsSet()) {
								const plasmaDonorInfo = makeSateObject();
								// call post function
								postPlasmainfo(plasmaDonorInfo);
								//clearFields();
							} else {
							}
							{
								<Text>Please Fill all Required Fields</Text>;
							}
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	inputStyle: {},
});

export default () => (
	<PlasmaDonorProvider>
		<PlasmaDonorScreen />
	</PlasmaDonorProvider>
);
