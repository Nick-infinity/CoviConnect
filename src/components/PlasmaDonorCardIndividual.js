import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { Text, Input, Button, Icon, SearchBar } from 'react-native-elements';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlasmaDonorCardIndividual = ({ item }) => {
	// destructure the item object
	const {
		name,
		city,
		state,
		bloodGroup,
		contact,
		updatedAt,
		area,
		age,
		recoveryDate,
		gender,
	} = item;
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
			<Text
				style={([styles.textStyle], [{ color: 'gray', fontWeight: '700' }])}
			>
				{name.toUpperCase()}
			</Text>
			<Text style={[styles.textStyle]}>Age: {age}</Text>
			<Text style={[styles.textStyle]}>{area}</Text>
			<Text style={[styles.textStyle]}>Blood Group: {bloodGroup}</Text>
			<Text style={[styles.textStyle]}>Recovered on: {recoveryDate}</Text>
			<TouchableOpacity onPress={() => dialCall(contact)}>
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

export default PlasmaDonorCardIndividual;
