import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { Text, Input, Button, Icon, SearchBar } from 'react-native-elements';

const OxygenDonorCardIndividual = ({ item }) => {
	// destructure the item object
	const { name, city, state, contact, updatedAt, area, age, gender } = item;
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
	return (
		<View style={styles.container}>
			<Text
				style={([styles.textStyle], [{ color: 'gray', fontWeight: '700' }])}
			>
				{name.toUpperCase()}
			</Text>
			<Text style={[styles.textStyle]}>Age: {age}</Text>
			<Text style={[styles.textStyle]}>{area}</Text>
			<TouchableOpacity onPress={() => dialCall(contact)}>
				<View style={styles.callcontainer}>
					<Text style={[styles.textStyle]}>Call: {contact}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		borderWidth: 2,
		marginHorizontal: 10,
		marginBottom: 10,
		borderColor: 'gray',
		paddingHorizontal: 5,
		paddingVertical: 5,
		width: Dimensions.get('screen').width / 2.5,
	},
	locationcontainer: {
		flexDirection: 'row',
	},
	textStyle: {},
	callcontainer: {
		borderRadius: 7,
		paddingHorizontal: 3,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
	},
});

export default OxygenDonorCardIndividual;
