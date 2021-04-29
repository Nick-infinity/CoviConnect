import color from 'color';
import React from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';

import { Input, Button, Icon, SearchBar } from 'react-native-elements';

const PlasmaDonorOrganization = ({ item }) => {
	// destructure the item object
	const { name, city, state, bloodGroups, contact, contact2, area } = item;

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
			<Text style={[styles.textStyle]}>{area}</Text>
			<Text style={[styles.textStyle]}>Plasma for: {bloodGroups}</Text>
			<TouchableOpacity onPress={() => dialCall(contact)}>
				<View style={styles.callcontainer}>
					<Text style={[styles.textStyle]}>Call: {contact}</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => dialCall(contact2)}>
				<View style={styles.callcontainer}>
					<Text style={[styles.textStyle]}>Call: {contact2}</Text>
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
	textStyle: {
		color: 'black',
	},
	callcontainer: {
		borderRadius: 7,
		paddingHorizontal: 3,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
	},
});
export default PlasmaDonorOrganization;
