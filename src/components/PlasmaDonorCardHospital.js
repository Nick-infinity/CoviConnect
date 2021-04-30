import color from 'color';
import React from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';

import { Input, Button, Icon, SearchBar } from 'react-native-elements';

const PlasmaDonorCardHospital = ({ item }) => {
	// destructure the item object
	const { name, city, state, bloodGroups, contact, area, availability } = item;

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
	return (
		<View style={styles.container}>
			<Text
				style={([styles.textStyle], [{ color: 'gray', fontWeight: '700' }])}
			>
				{name.toUpperCase()}
			</Text>
			<Text style={[styles.textStyle]}>{area}</Text>
			<Text style={[styles.textStyle]}>Plasma for: {bloodGroups}</Text>

			<TouchableOpacity onPress={() => dialCall()}>
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
export default PlasmaDonorCardHospital;
