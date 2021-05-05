import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TouchableHighlight, View, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Shortcut = ({ title, iconName, onClick, iconSelector }) => {
	// const touchProps = {
	// 	underlayColor: 'gray',
	// 	// style: isPress ? styles.btnPress : styles.btnNormal, // <-- but you can still apply other style changes
	// 	onHideUnderlay: () => setIsPress(false),
	// 	onShowUnderlay: () => setIsPress(true),
	// , // <-- "onPress" is apparently required
	// };

	return (
		<View
			style={[
				styles.ShortcutContainer,
				iconSelector === 1
					? { borderColor: 'gray', borderWidth: windowWidth * 0.005 }
					: null,
			]}
		>
			<TouchableOpacity onPress={() => onClick()}>
				<Icon
					color="white"
					name={iconName}
					type="font-awesome-5"
					style={[styles.iconStyle]}
					size={RFPercentage(3.2)}
				/>
				<Text style={[styles.titleStyle]}>{title}</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	ShortcutContainer: {
		borderRadius: windowWidth * 0.07,
		backgroundColor: '#272727',
		paddingHorizontal: windowWidth * 0.04,
		paddingVertical: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.02,
	},

	titleStyle: {
		color: 'white',
		fontSize: RFPercentage(1.8),
		marginTop: windowHeight * 0.007,
	},
	iconStyle: {},
});

export default Shortcut;
