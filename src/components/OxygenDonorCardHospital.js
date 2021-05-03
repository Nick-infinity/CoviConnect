import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';

import { Input, Button, Icon, SearchBar } from 'react-native-elements';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OxygenDonorCardHospital = ({ item }) => {
	// destructure the item object
	const { name, city, state, contact, area, updatedAt } = item;

	const dialCall = () => {
		let phoneNumber = '';

		if (Platform.OS === 'android') {
			phoneNumber = `tel:${contact}`;
			console.log(phoneNumber);
		} else {
			phoneNumber = `telprompt:${contact}`;
		}

		Linking.openURL(phoneNumber);
	};

	function reverseString(str) {
		str = str.substring(0, 10);
		let arr = str.split('-');
		str = arr[2] + '-' + arr[1] + '-' + arr[0];
		return str;
	}
	return (
		<View style={styles.container}>
			<Text
				style={([styles.textStyle], [{ color: 'gray', fontWeight: '700' }])}
			>
				{name.toUpperCase()}
			</Text>
			<Text style={[styles.textStyle]}>{area}</Text>

			<TouchableOpacity onPress={() => dialCall()}>
				<View style={styles.callcontainer}>
					<Text style={[styles.textStyle]}>Call: {contact}</Text>
				</View>
			</TouchableOpacity>
			<Text style={styles.postedOn}>Posted on: {reverseString(updatedAt)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: windowWidth * 0.04,
		borderWidth: 2,
		marginHorizontal: windowWidth * 0.02,
		marginBottom: windowHeight * 0.013,
		borderColor: 'gray',
		paddingHorizontal: windowWidth * 0.01,
		paddingVertical: windowHeight * 0.007,
		width: windowWidth / 2.5,
	},
	locationcontainer: {
		flexDirection: 'row',
	},
	textStyle: {
		color: 'black',
	},
	postedOn: {
		fontSize: RFPercentage(1.7),
		color: 'gray',
		textAlign: 'center',
	},
	callcontainer: {
		borderRadius: windowWidth * 0.03,
		paddingHorizontal: windowWidth * 0.01,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: windowHeight * 0.007,
	},
});
export default OxygenDonorCardHospital;
