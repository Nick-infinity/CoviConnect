import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const DonorsNote = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.banner}>IMPORTANT NOTE</Text>
			<Text style={styles.text}>1. Donors Sould be 18 years or above</Text>
			<Text style={styles.text}>
				2. Donors should have recovered atleast 14 days before donating
			</Text>
			<Text style={styles.text}>
				3. Do not have transmissible viruses including hepatitis and HIV
			</Text>

			<Text style={styles.text}>
				4. Should not have cancer, kidney transplant, TB, underwent surgery or
				had a tattoo in the past six months are ineligible
			</Text>
			<Text style={styles.text}>
				5. Drink plenty of water or juice to be fully hydrated
			</Text>
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
