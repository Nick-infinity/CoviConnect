import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';

const Shortcut = ({ title, iconName, onClick }) => {
	// const touchProps = {
	// 	underlayColor: 'gray',
	// 	// style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
	// 	onHideUnderlay: () => setIsPress(false),
	// 	onShowUnderlay: () => setIsPress(true),
	// , // <-- "onPress" is apparently required
	// };

	return (
		<TouchableOpacity onPress={() => onClick()} style={[styles.btnNormal]}>
			<View style={styles.ShortcutContainer}>
				<Icon
					color="white"
					name={iconName}
					type="font-awesome-5"
					style={[styles.iconStyle]}
				/>
				<Text style={[styles.titleStyle]}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	ShortcutContainer: {
		padding: 10,
		justifyContent: 'center',
		alignContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},

	btnNormal: {
		borderColor: '#272727',
		borderWidth: 1,
		borderRadius: 20,
		backgroundColor: '#272727',
	},
	titleStyle: {
		marginTop: 5,
		color: 'white',
	},

	iconStyle: {},
});
export default Shortcut;
