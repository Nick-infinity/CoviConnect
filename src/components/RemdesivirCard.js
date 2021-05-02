import React from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Text, Linking, Platform } from 'react-native';

const RemdesivirCard = ({ item }) => {
	// destructure the item object

	// sturcture{
	//     name: ""
	//     area:""
	//     pin:
	//     state:''
	//     city:
	//     contact:
	//     contct2:
	//     email:""
	// }
	const {
		name,
		city,
		state,
		contact,
		contact2 = '',
		email = '',
		area,
		location,
	} = item;

	const dialCall = (phn) => {
		let phoneNumber = '';

		if (Platform.OS === 'android') {
			phoneNumber = `tel:${phn}`;
			// console.log(phoneNumber);
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
			<Text>{city}</Text>
			<Text style={[styles.textStyle]}>{location}</Text>

			{email !== '' && email !== 'none' ? (
				<TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
					<View style={styles.callcontainer}>
						<Text style={[styles.textStyle]}>Email: {email}</Text>
					</View>
				</TouchableOpacity>
			) : null}

			<TouchableOpacity onPress={() => dialCall(contact)}>
				<View style={styles.callcontainer}>
					<Text style={[styles.textStyle]}>Call: {contact}</Text>
				</View>
			</TouchableOpacity>
			{contact2 !== '' ? (
				<TouchableOpacity onPress={() => dialCall(contact2)}>
					<View style={styles.callcontainer}>
						<Text style={[styles.textStyle]}>Call: {contact2}</Text>
					</View>
				</TouchableOpacity>
			) : null}
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
export default RemdesivirCard;
