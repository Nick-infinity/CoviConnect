import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, Vibration } from 'react-native';
import { View } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DonorTypeSelector = ({ myNav, scrn1, scrn2, scrn3 }) => {
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.container}>
				<Text style={styles.bannerStyle}>Choose Category</Text>
				<View style={styles.btncontainer}>
					<TouchableOpacity
						style={styles.btnStyle}
						onPress={() => {
							Vibration.vibrate(20);
							myNav.navigate(scrn1);
						}}
					>
						<Icon
							size={RFPercentage(5)}
							type="material-icons-outlined"
							name="local-hospital"
							style={styles.iconStyle}
						/>
						<Text style={styles.txtStyle}>Hospital</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnStyle}
						onPress={() => {
							Vibration.vibrate(20);
							myNav.navigate(scrn2);
						}}
					>
						<Icon
							size={RFPercentage(5)}
							type="material-icons-outlined"
							name="volunteer-activism"
							style={styles.iconStyle}
						/>
						<Text style={styles.txtStyle}>Organization</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnStyle}
						onPress={() => {
							Vibration.vibrate(20);
							myNav.navigate(scrn3);
						}}
					>
						<Icon
							size={RFPercentage(5)}
							type="font-awesome-5"
							name="hands-helping"
							style={styles.iconStyle}
						/>
						<Text style={styles.txtStyle}>Individual</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	btncontainer: {
		alignItems: 'stretch',
		marginHorizontal: windowWidth * 0.17,
	},
	container: {
		marginBottom: windowHeight * 0.026,
	},
	bannerStyle: {
		alignSelf: 'center',
		marginTop: windowHeight * 0.026,
		marginBottom: windowHeight * 0.026,
		fontWeight: 'bold',
		fontSize: RFPercentage(5),
	},
	iconStyle: {},
	btnStyle: {
		flexDirection: 'row',
		borderRadius: windowWidth * 0.05,
		borderWidth: 1,
		borderColor: 'gray',
		marginVertical: windowHeight * 0.026,
		paddingVertical: windowHeight * 0.026,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	txtStyle: {
		fontSize: RFPercentage(3.8),
		fontWeight: '600',
	},
});
export default DonorTypeSelector;
