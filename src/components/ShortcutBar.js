import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button, Icon, normalize } from 'react-native-elements';
import Shortcut from './Shortcut';

const ShortcutBarPlasma = ({
	title1,
	title2,
	iconName1,
	iconName2,
	onClick1,
	onClick2,
}) => {
	return (
		<View style={styles.container}>
			<Shortcut title={title1} iconName={iconName1} onClick={onClick1} />
			<Shortcut title={title2} iconName={iconName2} onClick={onClick2} />
		</View>
	);
};
const styles = StyleSheet.create({
	ShortcutContainer: {},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		borderRadius: 20,
		paddingVertical: 10,
		marginHorizontal: 10,
		zIndex: 5,
	},
});
export default ShortcutBarPlasma;