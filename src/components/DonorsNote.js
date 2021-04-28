import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const DonorsNote = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.banner}>IMPORTANT NOTE</Text>
			<Text style={styles.text}>Note...........</Text>
			<Text style={styles.text}>Note...........</Text>
			<Text style={styles.text}>Note...........</Text>
			<Text style={styles.text}>Note...........</Text>
			<Text style={styles.text}>Note...........</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginHorizontal: 10,
		borderRadius: 20,
		borderColor: 'gray',
		borderWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 5,
	},
	text: {
		textAlign: 'left',

		color: 'gray',
	},
	banner: {
		fontSize: 16,
		textAlign: 'center',
		alignSelf: 'center',
		color: '#ffaebe',
		fontWeight: 'bold',
	},
});
export default DonorsNote;
