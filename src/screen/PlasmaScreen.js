import React, { useState, useContext, useEffect } from 'react';
import {
	View,
	StyleSheet,
	StatusBar,
	ScrollView,
	Text,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Icon, ButtonGroup, Overlay } from 'react-native-elements';
import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import DonorTypeSelector from '../components/DonorTypeSelector';
import Spacer from '../components/Spacer';
import { Context as PlasmaDonorContext } from '../context/PlasmaDonorContext';
import PlasmaDonorCardHospital from '../components/PlasmaDonorCardHospital';
import PlasmaDonorCardIndividual from '../components/PlasmaDonorCardIndividual';
import PlasmaDonorCardOrganization from '../components/PlasmaDonorCardOrganization';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PlasmaScreen = ({ navigation }) => {
	// for cehcking which screen is running
	const [screenState, setScreenState] = useState(0);
	const [visible, setVisible] = useState(false);
	const [isOverlayDisabled, setOverlayDisabled] = useState(0);
	// 0 for search screen
	// 1 for donor screen

	// for search
	const [searchCity, setSearchCity] = useState('');
	const { getDonorListFromCity, state } = useContext(PlasmaDonorContext);

	// for selection in donor list
	const [donorCategoryIndex, setdonorCategoryIndex] = useState(0);
	const donorCategories = ['Hospitals', 'Organizations', 'Individuals'];

	const toggleOverlay = async () => {
		if (isOverlayDisabled === 1) {
			//	console.log('Read from State:Overlay is disabled in state');
			return;
			// do nothing
		} else if (isOverlayDisabled === 0) {
			//	console.log('Read from State:Overlay is enabld in state');
			//	console.log('Now reading storage');
			try {
				let overlayDis = await AsyncStorage.getItem('isOverlayDisabled');
				//	console.log(overlayDis, 'From storeage without parsing');
				overlayDis !== null ? JSON.parse(overlayDis) : 0;
				//	console.log(overlayDis, 'From storeage with parsing');

				if (overlayDis === null || overlayDis === 0 || overlayDis === '0') {
					//		console.log('Found overlay enabld in storage: Showig ovelray now');
					//enable when overlay is not disabled
					setVisible(true);
					return;
				}
				setVisible(false);
				//	console.log('Setting setoverlaydisbld to ', 1);
				setOverlayDisabled(1);
				return;
			} catch (e) {
				//	console.log('Found some error readinf from storgae: showing overlay');
				// enable ooverlay if we face error in  reding from storage
				setVisible(true);
				return;
			}
		}
		//	console.log('Last resort: Showing overlay');
		setVisible(!visible);
	};

	const onOverlayBackPress = () => {
		setVisible(!visible);
	};

	const doNotSHowAgain = async () => {
		setOverlayDisabled(1);
		try {
			await AsyncStorage.setItem('isOverlayDisabled', JSON.stringify(1));
			setVisible(false);
		} catch (e) {
			console.log('err');
		}
	};

	useEffect(() => {
		console.log('Calling toggle overlay from useeffect');
		toggleOverlay();
	}, []);

	const InfoMesgOverlay = () => {
		return (
			<Overlay
				isVisible={visible}
				onBackdropPress={onOverlayBackPress}
				overlayStyle={{
					borderRadius: windowWidth * 0.05,
					width: windowWidth * 0.9,
					height: windowHeight * 0.6,
				}}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.overlayContainer}>
						<View
							style={{
								borderRadius: windowWidth * 0.05,
								borderWidth: 1,
								borderColor: 'gray',
								padding: windowWidth * 0.02,
								alignSelf: 'center',
								marginBottom: windowHeight * 0.013,
							}}
						>
							<Text
								style={{
									fontWeight: '700',
									marginHorizontal: windowWidth * 0.02,
									fontSize: RFPercentage(1.8),
								}}
							>
								Application Usage
							</Text>
						</View>
						<Text
							style={{
								textAlign: 'center',
								marginHorizontal: windowWidth * 0.02,
								fontWeight: '700',
								fontSize: RFPercentage(1.8),
							}}
						>
							App provides single secure platform to connect plasma, oxygen/beds
							& remdesivir providers with patients
						</Text>

						<Spacer />
						<Text
							style={{
								fontWeight: '700',
								marginHorizontal: windowWidth * 0.02,
								fontSize: RFPercentage(1.8),
							}}
						>
							For Patients
						</Text>
						<Text style={styles.Overlaytext}>
							1. You can search for plasma, oxygen/beds, remdesivir providers
						</Text>
						<Text style={styles.Overlaytext}>
							2. Click on search button and enter your city
						</Text>
						<Text style={styles.Overlaytext}>
							3. The app will show you list of available donors in your city
						</Text>
						<Spacer />
						<Text
							style={{
								fontWeight: '700',
								marginHorizontal: windowWidth * 0.02,
								fontSize: RFPercentage(1.8),
							}}
						>
							For Donors/Providers
						</Text>
						<Text style={styles.Overlaytext}>
							1.Navigate to Plasma, Oxygen or Remdesivir section based on your
							requirement
						</Text>
						<Text style={styles.Overlaytext}>
							2. Click on Donate button and chose suitale category
						</Text>
						<Text style={styles.Overlaytext}>
							3. Fill your latest details in the form and click on Save button
						</Text>
						<Text style={styles.Overlaytext}>
							4. You can easily manage the status of your posts in Dashboard
							section
						</Text>
					</View>
					<TouchableOpacity onPress={() => doNotSHowAgain()}>
						<Text
							style={{
								fontSize: RFPercentage(1.6),
								color: 'gray',
								textAlign: 'center',
								marginTop: windowHeight * 0.013,
							}}
						>
							Do not show again
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</Overlay>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#aaaaaa" />
			<View style={styles.containerTop}>
				<InfoMesgOverlay />
				<Text style={styles.headingStyle}>PLASMA</Text>
				<Text style={styles.shortcutBannerStyle}>Find Or Donate Plasma</Text>
				<ShortcutBar
					title1="Search Donor"
					title2="Donate Plasma"
					btncount={2}
					title3=""
					iconName3=""
					iconName1="search"
					iconName2="hand-holding-water"
					iconSelector={screenState}
					onClick1={() => {
						setScreenState(0);
					}}
					onClick2={() => {
						setScreenState(1);
					}}
					onClick3={() => {}}
				/>
			</View>

			<View style={styles.containerBottom}>
				{screenState === 0 ? (
					<View style={styles.resultScreen}>
						<Input
							leftIcon={
								<Icon name="search" type="material" size={30} color="black" />
							}
							placeholderTextColor="gray"
							placeholder="Enter your city to find donors"
							style={styles.searchStyle}
							inputContainerStyle={{
								borderBottomWidth: 0,
								marginBottom: -windowHeight * 0.026,
							}}
							value={searchCity}
							onChangeText={(city) => setSearchCity(city)}
							onSubmitEditing={() => {
								console.log(searchCity.toLocaleLowerCase());
								getDonorListFromCity(searchCity.toLocaleLowerCase().trim());
							}}
						></Input>

						<ButtonGroup
							selectedButtonStyle={{ backgroundColor: '#272727' }}
							onPress={(num) => setdonorCategoryIndex(num)}
							selectedIndex={donorCategoryIndex}
							buttons={donorCategories}
							containerStyle={btnGroupStyle}
						/>
						<Spacer />
						{state.responseMsg === 'Something went wrong. Please try again' ||
						state.responseMsg === 'Please enter a city name' ||
						state.responseMsg ===
							'Cant find donors in your area.\n Enter proper city name or try with nearby city.' ? (
							<Text style={styles.errorMesg}>{state.responseMsg}</Text>
						) : null}
						{donorCategoryIndex === 0 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								style={styles.flatList}
								numColumns={2}
								data={state.donorList[0]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <PlasmaDonorCardHospital item={item} />;
								}}
							/>
						) : null}
						{donorCategoryIndex === 1 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								numColumns={2}
								style={styles.flatList}
								data={state.donorList[1]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <PlasmaDonorCardOrganization item={item} />;
								}}
							/>
						) : null}
						{donorCategoryIndex === 2 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								numColumns={2}
								style={styles.flatList}
								data={state.donorList[2]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <PlasmaDonorCardIndividual item={item} />;
								}}
							/>
						) : null}
					</View>
				) : (
					<View style={styles.formContainer}>
						<DonorTypeSelector
							myNav={navigation}
							scrn1={'PDhospital'}
							scrn2={'PDorganization'}
							scrn3={'PDindividual'}
						/>
					</View>
				)}
			</View>
		</View>
	);
};

const btnGroupStyle = {
	marginBottom: -windowHeight * 0.013,
	height: windowHeight * 0.05,
	borderRadius: windowWidth * 0.03,
};

const styles = StyleSheet.create({
	Overlaytext: {
		marginHorizontal: windowWidth * 0.02,
		fontSize: RFPercentage(1.8),
	},
	formContainer: {
		backgroundColor: 'white',
		borderRadius: windowWidth * 0.05,
	},
	headingStyle: {
		marginLeft: windowWidth * 0.02,
		marginTop: windowHeight * 0.013,
		fontWeight: 'bold',
		fontSize: RFPercentage(5),
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	containerTop: {
		justifyContent: 'flex-start',
		marginBottom: 10,
	},
	containerBottom: {
		marginHorizontal: windowWidth * 0.02,
		flex: 1,
		justifyContent: 'flex-start',
		marginTop: windowHeight * 0.001,
		marginBottom: windowHeight * 0.08,
	},
	shortcutBannerStyle: {
		marginLeft: windowWidth * 0.02,
		fontSize: RFPercentage(2.4),
		color: 'gray',
		fontWeight: '600',
	},
	searchStyle: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: windowWidth * 0.04,
		paddingHorizontal: windowWidth * 0.025,
		fontSize: RFPercentage(2.4),
		marginTop: windowHeight * 0.013,
	},
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: windowWidth * 0.05,
		flex: 1,
	},
	flatList: {
		alignSelf: 'center',
	},
	errorMesg: {
		fontSize: RFPercentage(1.7),
		color: 'red',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: windowHeight * 0.007,
	},
});
export default PlasmaScreen;
