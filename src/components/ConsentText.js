import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
		marginTop: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.02,
	},
	text: {
		textAlign: 'center',
		alignSelf: 'center',
		color: 'gray',
		fontSize: RFPercentage(1.79),
		fontWeight: 'bold',
	},
});
export default ConsentText;
