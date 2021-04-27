import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
const DonorTypeSelector = () => {
	return (
		<View style={styles.container}>
			<Text h2 style={styles.bannerStyle}>
				Choose Category
			</Text>
			<View style={styles.btncontainer}>
				<TouchableOpacity style={styles.btnStyle}>
					<Icon
						size={30}
						type="material-icons-outlined"
						name="local-hospital"
						style={styles.iconStyle}
					/>
					<Text style={styles.txtStyle}>Hospital</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnStyle}>
					<Icon
						size={35}
						type="material-icons-outlined"
						name="volunteer-activism"
						style={styles.iconStyle}
					/>
					<Text style={styles.txtStyle}>Organization</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btnStyle}>
					<Icon
						size={30}
						type="font-awesome-5"
						name="hands-helping"
						style={styles.iconStyle}
					/>
					<Text style={styles.txtStyle}>Individual</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	btncontainer: {
		alignItems: 'stretch',
		marginHorizontal: 60,
	},
	container: {
		marginBottom: 20,
	},
	bannerStyle: {
		alignSelf: 'center',
		marginTop: 20,
		marginBottom: 20,
	},
	iconStyle: {},
	btnStyle: {
		flexDirection: 'row',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'gray',
		marginVertical: 20,
		paddingVertical: 20,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	txtStyle: {
		fontSize: 25,
		fontWeight: '600',
	},
});
export default DonorTypeSelector;
