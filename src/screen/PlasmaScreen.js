import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Icon, ButtonGroup } from 'react-native-elements';
import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import DonorTypeSelector from '../components/DonorTypeSelector';
import Spacer from '../components/Spacer';
import { Context as PlasmaDonorContext } from '../context/PlasmaDonorContext';
import PlasmaDonorCardHospital from '../components/PlasmaDonorCardHospital';
import PlasmaDonorCardIndividual from '../components/PlasmaDonorCardIndividual';
import PlasmaDonorCardOrganization from '../components/PlasmaDonorCardOrganization';

const PlasmaScreen = ({ navigation }) => {
	// for cehcking which screen is running
	const [screenState, setScreenState] = useState(0);
	// 0 for search screen
	// 1 for donor screen

	// for search
	const [searchCity, setSearchCity] = useState('');
	const { getDonorListFromCity, state } = useContext(PlasmaDonorContext);

	// for selection in donor list
	const [donorCategoryIndex, setdonorCategoryIndex] = useState(0);
	const donorCategories = ['Hospitals', 'Organizations', 'Individuals'];

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<View style={styles.containerTop}>
					<Text h1 style={styles.headingStyle}>
						PLASMA
					</Text>

					<Text style={styles.shortcutBannerStyle}>Find Or Donate Plasma</Text>
					<ShortcutBar
						title1="Search Donor"
						title2="Donate Plasma"
						iconName1="search"
						iconName2="hand-holding-water"
						onClick1={() => {
							setScreenState(0);
						}}
						onClick2={() => {
							setScreenState(1);
						}}
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
									marginBottom: -10,
								}}
								value={searchCity}
								onChangeText={(city) => setSearchCity(city)}
								onSubmitEditing={() => {
									console.log(searchCity.toLocaleLowerCase());
									getDonorListFromCity(searchCity.toLocaleLowerCase());
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
							state.responseMsg ===
								'Cant find donors in your area.\n Enter proper city name or try with nearby city.' ? (
								<Text style={styles.errorMesg}>{state.responseMsg}</Text>
							) : null}
							{donorCategoryIndex === 0 ? (
								<FlatList
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
export default PlasmaScreen;
