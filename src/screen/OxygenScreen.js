import React, { useState, useContext } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Icon, ButtonGroup } from 'react-native-elements';
import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import DonorTypeSelector from '../components/DonorTypeSelector';
import Spacer from '../components/Spacer';
import { Context as OxygenDonorContext } from '../context/PlasmaDonorContext';
import OxygenDonorCardHospital from '../components/OxygenDonorCardHospital';
import OxygenDonorCardOrganization from '../components/OxygenDonorCardOrganization';
import OxygenDonorCardIndividual from '../components/OxygenDonorCardIndividual';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OxygenScreen = ({ navigation }) => {
	// for cehcking which screen is running
	const [screenState, setScreenState] = useState(0);

	// for search
	const [searchCity, setSearchCity] = useState('');
	const { getOxygenDonorListFromCity, state } = useContext(OxygenDonorContext);

	// for selection in donor list
	const [donorCategoryIndex, setdonorCategoryIndex] = useState(0);
	const donorCategories = ['Hospitals', 'Organizations', 'Individuals'];

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor="#aaaaaa" />
			<View style={styles.containerTop}>
				<Text style={styles.headingStyle}>OXYGEN</Text>
				<Text style={styles.shortcutBannerStyle}>Find Or Provide Oxygen</Text>
				<ShortcutBar
					title1="Search Oxygen"
					title2="Provide Oxygen "
					btncount={2}
					title3=""
					iconName3=""
					iconName1="search"
					iconName2="hand-holding-heart"
					onClick1={() => setScreenState(0)}
					onClick2={() => setScreenState(1)}
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
							placeholder="Enter your city to find providers"
							style={styles.searchStyle}
							inputContainerStyle={{
								borderBottomWidth: 0,
								marginBottom: -windowHeight * 0.026,
							}}
							value={searchCity}
							onChangeText={(city) => setSearchCity(city)}
							onSubmitEditing={() => {
								console.log(searchCity.toLocaleLowerCase());
								getOxygenDonorListFromCity(searchCity.toLocaleLowerCase());
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
						{state.oxygenresponseMsg ===
							'Something went wrong. Please try again' ||
						state.oxygenresponseMsg ===
							'Cant find donors in your area.\n Enter proper city name or try with nearby city.' ||
						state.oxygenresponseMsg === 'Please enter a city name' ? (
							<Text style={styles.errorMesg}>{state.oxygenresponseMsg}</Text>
						) : null}
						{donorCategoryIndex === 0 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								style={styles.flatList}
								numColumns={2}
								data={state.donorListOxygen[0]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <OxygenDonorCardHospital item={item} />;
								}}
							/>
						) : null}
						{donorCategoryIndex === 1 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								numColumns={2}
								style={styles.flatList}
								data={state.donorListOxygen[1]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <OxygenDonorCardOrganization item={item} />;
								}}
							/>
						) : null}
						{donorCategoryIndex === 2 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								numColumns={2}
								style={styles.flatList}
								data={state.donorListOxygen[2]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <OxygenDonorCardIndividual item={item} />;
								}}
							/>
						) : null}
					</View>
				) : (
					<View style={styles.formContainer}>
						<DonorTypeSelector
							myNav={navigation}
							scrn1={'ODhospital'}
							scrn2={'ODorganization'}
							scrn3={'ODindividual'}
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
export default OxygenScreen;
