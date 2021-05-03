import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const Spacer = ({ children }) => {
	return <View style={styles.spacerStyle}>{children}</View>;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	spacerStyle: {
		margin: windowHeight * 0.013,
	},
});
export default Spacer;
