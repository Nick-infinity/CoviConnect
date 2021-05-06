import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';

import { Input, Button, Icon, SearchBar } from 'react-native-elements';
import { FirstLetterUpperCase } from '../components/FirstLetterUpperCase';
// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OrganizationDonorOrganization = ({ item }) => {
	// destructure the item object
	const { name, city, state, contact, contact2, area, updatedAt } = item;

	const dialCall = (phn) => {
		let phoneNumber = '';

		if (Platform.OS === 'android') {
			phoneNumber = `tel:${phn}`;
			console.log(phoneNumber);
		} else {
			phoneNumber = `telprompt:${phn}`;
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
			<Text style={styles.nameStyle}>{name.toUpperCase()}</Text>
			<Text style={styles.textStyle}>{area}</Text>
			<Text style={styles.textStyle}>{FirstLetterUpperCase(city)}</Text>

			<TouchableOpacity onPress={() => dialCall(contact)}>
				<View style={styles.callcontainer}>
					<Text style={styles.textStyle}>Call: {contact}</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => dialCall(contact2)}>
				<View style={styles.callcontainer}>
					<Text style={styles.textStyle}>Call: {contact2}</Text>
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
		backgroundColor: 'white',
		elevation: 3,
	},
	locationcontainer: {
		flexDirection: 'row',
	},
	nameStyle: {
		color: 'gray',
		fontWeight: '700',
		fontSize: RFPercentage(2.1),
	},
	textStyle: {
		color: 'black',
		fontSize: RFPercentage(2),
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
		backgroundColor: '#f2f2f2',
		elevation: 3,
	},
});
export default OrganizationDonorOrganization;
