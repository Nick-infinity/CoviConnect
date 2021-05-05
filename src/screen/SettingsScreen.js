import React, { useContext, useEffect } from 'react';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Linking,
	StatusBar,
	Vibration,
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Icon } from 'react-native-elements';
import { Context as UserCountContext } from '../context/PlasmaDonorContext';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SettingsScreen = ({ navigation }) => {
	const { signout } = useContext(AuthContext);
	const { getUserCount, state, resetStateOnSignout } = useContext(
		UserCountContext
	);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getUserCount();
		});
		return unsubscribe;
	}, []);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<StatusBar backgroundColor="#aaaaaa" />

			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.containerTop}>
						<Text style={styles.headingStyle}>ABOUT</Text>

						<View style={styles.developer}>
							<View>
								<Text
									style={{
										textAlign: 'center',
										borderBottomWidth: 1,
										borderColor: 'gray',
										fontWeight: 'bold',
										fontSize: RFPercentage(3),
									}}
								>
									The Developer
								</Text>
							</View>
							<Text
								style={{
									textAlign: 'center',
									marginTop: windowHeight * 0.039,
									marginBottom: windowHeight * 0.026,
									fontSize: RFPercentage(3.5),
									fontWeight: 'bold',
								}}
							>
								NIKHIL GUPTA
							</Text>
							<View style={styles.socialContainer}>
								<TouchableOpacity
									onPress={() => Linking.openURL('mailto:nikhil1607@gmail.com')}
								>
									<View style={styles.btnStyle}>
										<Icon
											type="font-awesome-5"
											name="envelope"
											size={RFPercentage(3)}
										/>
										<Text style={styles.editbtnTextStyle}>Email</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										Linking.openURL(
											'https://www.instagram.com/nikhil.gupta___/'
										)
									}
								>
									<View style={styles.btnStyle}>
										<Icon
											type="font-awesome-5"
											name="instagram"
											size={RFPercentage(3)}
										/>
										<Text style={styles.editbtnTextStyle}>Instagram</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										Linking.openURL('https://twitter.com/NikhilG43348710')
									}
								>
									<View style={styles.btnStyle}>
										<Icon
											type="font-awesome-5"
											name="twitter"
											size={RFPercentage(3)}
										/>
										<Text style={styles.editbtnTextStyle}>Twitter</Text>
									</View>
								</TouchableOpacity>
							</View>
							<Text
								style={{
									alignSelf: 'center',
									marginTop: windowHeight * 0.013,
									paddingHorizontal: windowWidth * 0.02,
									alignContent: 'center',
									textAlign: 'justify',
									marginBottom: windowHeight * 0.013,
								}}
							>
								Thi app has been developed solely to support our people fighting
								against Covid-19. The app helps in accomodating information
								about plasma and oxygen donors for easy access. I urge
								hospitals, ngo's, healthcare organizations & individuals to come
								forward & list down the available resources.
							</Text>

							<Text
								style={{
									alignSelf: 'center',
									marginTop: windowHeight * 0.013,
									paddingHorizontal: windowWidth * 0.02,
									alignContent: 'center',
									textAlign: 'justify',
									marginBottom: windowHeight * 0.013,
								}}
							>
								The app requires web servers for smooth operations. If you want
								to support the cause kindly provide small donation to keep the
								app running. All donations will go towards server hosting fees,
								ultimately helping Covid-19 patients.
							</Text>
							<TouchableOpacity
								onPress={() =>
									Linking.openURL('https://gpay.app.goo.gl/pay-vUgkONy76Hb')
								}
							>
								<View style={[styles.donateBtnStyle]}>
									<Icon
										type="font-awesome-5"
										name="rupee-sign"
										size={RFPercentage(4)}
									/>
									<Text style={styles.editbtnTextStyle}>Donate via UPI</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.containerBottom}>
						<View style={styles.resultScreen}>
							<Text style={styles.userCount}>
								Active Plasma Donors: {state.usercount[0]}
							</Text>
							<Text style={styles.userCount}>
								Active Oxygen Providers: {state.usercount[1]}
							</Text>
							<Text style={styles.userCount}>
								Active Remdesivir Providers: {state.usercount[2]}
							</Text>
							<Text style={styles.userCount}>
								Total Users: {state.usercount[3]}
							</Text>
							<Text></Text>
							<TouchableOpacity
								onPress={() => {
									Vibration.vibrate(20);
									resetStateOnSignout();
									signout();
								}}
							>
								<View style={[styles.logoutBtn]}>
									<Text style={styles.logoutbtnTextStyle}>Logout</Text>
								</View>
							</TouchableOpacity>
							<Text
								style={{
									fontSize: RFPercentage(1.4),
									textAlign: 'center',
									marginTop: windowHeight * 0.013,
									marginHorizontal: windowWidth * 0.02,
									alignSelf: 'center',
								}}
							>
								Version: R 1.2
							</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const screenHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
	userStatsContainer: {
		borderRadius: windowWidth * 0.05,
		borderWidth: 1,
		borderColor: 'gray',
		marginHorizontal: windowWidth * 0.02,
	},
	socialContainer: {
		flexDirection: 'row',
		marginTop: windowHeight * 0.013,
		justifyContent: 'space-evenly',
		marginBottom: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.01,
		alignContent: 'center',
	},
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: windowWidth * 0.05,
		marginBottom: windowHeight / 5.5,
		padding: windowWidth * 0.02,
		borderColor: 'gray',
		borderWidth: 1,
	},
	containerBottom: {
		marginHorizontal: windowWidth * 0.02,
		flex: 1,
	},
	developer: {
		borderRadius: windowWidth * 0.05,
		borderWidth: 1,
		borderColor: 'gray',
		marginHorizontal: windowWidth * 0.02,
		paddingHorizontal: windowWidth * 0.02,
		backgroundColor: 'white',
	},
	containerTop: {
		marginBottom: windowHeight * 0.013,
	},
	userCount: {
		fontWeight: '700',
		marginHorizontal: windowWidth * 0.02,
	},

	headingStyle: {
		marginLeft: windowWidth * 0.02,
		marginTop: windowHeight * 0.007,
		marginBottom: windowHeight * 0.013,
		fontWeight: 'bold',
		fontSize: RFPercentage(5),
	},
	container: {
		height: '100%',
		marginTop: windowHeight * 0.013,
	},
	btnStyle: {
		borderRadius: windowWidth * 0.03,
		paddingHorizontal: windowWidth * 0.01,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: windowHeight * 0.007,
		alignItems: 'center',
		paddingHorizontal: windowWidth * 0.01,
		paddingVertical: windowHeight * 0.007,
	},
	donateBtnStyle: {
		borderRadius: windowWidth * 0.05,
		paddingHorizontal: windowWidth * 0.001,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: windowHeight * 0.007,
		alignItems: 'center',
		paddingHorizontal: windowWidth * 0.01,
		paddingVertical: 2,
		marginBottom: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.14,
	},
	logoutbtnTextStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(3),
	},
	logoutBtn: {
		borderRadius: windowWidth * 0.03,
		paddingHorizontal: windowWidth * 0.001,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: windowHeight * 0.007,
		alignItems: 'center',
		paddingHorizontal: windowWidth * 0.01,
		paddingVertical: windowHeight * 0.001,
		marginHorizontal: windowWidth * 0.14,
		backgroundColor: '#ff9994',
		alignContent: 'center',
	},
});
export default SettingsScreen;
