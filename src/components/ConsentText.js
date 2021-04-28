import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const ConsentText = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				I declare that above provide information is correct to my knowledge and
				it can be used publicly to help Covid-19 patients
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		marginHorizontal: 20,
	},
	text: {
		textAlign: 'center',
		alignSelf: 'center',
		color: 'gray',
		fontWeight: 'bold',
	},
});
export default ConsentText;
