import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
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
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<View style={styles.containerTop}>
					<Text h1 style={styles.headingStyle}>
						OXYGEN
					</Text>
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
									marginBottom: -10,
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
								'Cant find donors in your area.\n Enter proper city name or try with nearby city.' ? (
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
		</SafeAreaView>
	);
};
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const btnGroupStyle = {
	marginBottom: -10,
	height: 40,
	borderRadius: 12,
};

const styles = StyleSheet.create({
	btnGrpBannerStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: 10,
		marginBottom: 10,
	},
	formContainer: {
		backgroundColor: 'white',
		borderRadius: 20,
	},
	headingStyle: {
		marginLeft: 10,
		marginTop: 5,
	},
	container: {
		height: '100%',
		marginTop: 10,
	},
	containerTop: {
		marginBottom: 10,
	},
	containerBottom: {
		marginBottom: 80,
		marginHorizontal: 10,
		flex: 1,
	},
	shortcutBannerStyle: {
		marginLeft: 10,
		fontSize: 18,
		color: 'gray',
		fontWeight: '600',
	},
	searchStyle: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	searchStyleCity: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 20,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: 20,
		marginBottom: windowHeight / 5.5,
	},
	flatList: {
		alignSelf: 'center',
	},
	errorMesg: {
		color: 'red',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 5,
	},
});
export default OxygenScreen;
