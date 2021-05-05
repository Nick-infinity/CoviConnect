import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Input, Button, Icon, normalize } from 'react-native-elements';
import Shortcut from './Shortcut';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ShortcutBarPlasma = ({
	iconSelector,
	title1,
	title2,
	title3,
	iconName1,
	iconName2,
	iconName3,
	onClick1,
	onClick2,
	onClick3,
	btncount,
}) => {
	return (
		<View style={styles.container}>
			<Shortcut
				title={title1}
				iconSelector={iconSelector == 0 ? 1 : 0}
				iconName={iconName1}
				onClick={onClick1}
			/>

			<Shortcut
				title={title2}
				iconSelector={iconSelector == 1 ? 1 : 0}
				iconName={iconName2}
				onClick={onClick2}
			/>
			{btncount === 3 ? (
				<Shortcut
					title={title3}
					iconSelector={iconSelector == 2 ? 1 : 0}
					iconName={iconName3}
					onClick={onClick3}
				/>
			) : null}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: 'white',
		borderRadius: windowWidth * 0.05,
		paddingHorizontal: windowWidth * 0.02,
		paddingVertical: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.02,
	},
});
export default ShortcutBarPlasma;
