import React, { useContext, useEffect } from 'react';

import {
	StyleSheet,
	View,
	Dimensions,
	TouchableOpacity,
	Linking,
	Button,
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Icon } from 'react-native-elements';
import { Context as UserCountContext } from '../context/PlasmaDonorContext';

const SettingsScreen = ({ navigation }) => {
	const { signout } = useContext(AuthContext);
	const { getUserCount, state } = useContext(UserCountContext);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getUserCount();
		});
		return unsubscribe;
	}, []);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.containerTop}>
						<Text h1 style={styles.headingStyle}>
							ABOUT
						</Text>

						<View style={styles.developer}>
							<View>
								<Text
									h4
									style={{
										textAlign: 'center',
										borderBottomWidth: 1,
										borderColor: 'gray',
									}}
								>
									The Developer
								</Text>
							</View>
							<Text
								h3
								style={{ textAlign: 'center', marginTop: 30, marginBottom: 20 }}
							>
								NIKHIL GUPTA
							</Text>
							<View style={styles.socialContainer}>
								<TouchableOpacity
									onPress={() => Linking.openURL('mailto:nikhil1607@gmail.com')}
								>
									<View style={styles.btnStyle}>
										<Icon type="font-awesome-5" name="envelope" />
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
										<Icon type="font-awesome-5" name="instagram" />
										<Text style={styles.editbtnTextStyle}>Instagram</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() =>
										Linking.openURL('https://twitter.com/NikhilG43348710')
									}
								>
									<View style={styles.btnStyle}>
										<Icon type="font-awesome-5" name="twitter" />
										<Text style={styles.editbtnTextStyle}>Twitter</Text>
									</View>
								</TouchableOpacity>
							</View>
							<Text
								style={{
									alignSelf: 'center',
									marginTop: 10,
									paddingHorizontal: 10,
									alignContent: 'center',
									textAlign: 'justify',
									marginBottom: 10,
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
									marginTop: 10,
									paddingHorizontal: 10,
									alignContent: 'center',
									textAlign: 'justify',
									marginBottom: 10,
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
									<Icon type="font-awesome-5" name="rupee-sign" size={30} />
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
								Active Oxygen Donors: {state.usercount[1]}
							</Text>
							<Text style={styles.userCount}>
								Total Users: {state.usercount[2]}
							</Text>
							<Text></Text>
							<TouchableOpacity onPress={() => signout()}>
								<View style={[styles.logoutBtn]}>
									<Text style={styles.editbtnTextStyle}>Logout</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const styles = StyleSheet.create({
	userStatsContainer: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'gray',
		marginHorizontal: 10,
	},
	socialContainer: {
		flexDirection: 'row',
		marginTop: 10,
		justifyContent: 'space-evenly',
		marginBottom: 10,
		marginHorizontal: 5,
		alignContent: 'center',
	},
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: 20,
		marginBottom: windowHeight / 5.5,
		padding: 10,
		borderColor: 'gray',
		borderWidth: 1,
	},
	containerBottom: {
		marginHorizontal: 10,
		flex: 1,
	},
	developer: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'gray',
		marginHorizontal: 10,
		paddingHorizontal: 10,
	},
	containerTop: {
		marginBottom: 10,
	},
	userCount: {},

	headingStyle: {
		marginLeft: 10,
		marginTop: 5,
		marginBottom: 10,
	},
	container: {
		height: '100%',
		marginTop: 10,
	},
	btnStyle: {
		borderRadius: 7,
		paddingHorizontal: 3,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	donateBtnStyle: {
		borderRadius: 20,
		paddingHorizontal: 3,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 2,
		marginBottom: 15,
		marginHorizontal: 70,
	},
	editbtnTextStyle: {
		fontWeight: '700',
		fontSize: 24,
	},
	logoutBtn: {
		borderRadius: 15,
		paddingHorizontal: 3,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 2,
		marginHorizontal: 70,
		backgroundColor: '#ff9994',
		alignContent: 'center',
	},
});
export default SettingsScreen;
