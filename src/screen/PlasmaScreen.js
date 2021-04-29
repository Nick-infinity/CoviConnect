import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button, Icon, SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native';
import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import { Provider as PlasmaDonorProvider } from '../context/PlasmaDonorContext';
import DonorTypeSelector from '../components/DonorTypeSelector';
import Spacer from '../components/Spacer';
import MultiBloodGroupCheckr from '../components/MultiBloodGroupChecker';
import { Context as PlasmaDonorContext } from '../context/PlasmaDonorContext';

const PlasmaScreen = ({ navigation }) => {
	// for cehcking which screen is running
	const [screenState, setScreenState] = useState(0);
	// 0 for search screen
	// 1 for donor screen

	// for search
	const [searchCity, setSearchCity] = useState('');
	const { getDonorListFromCity, state } = useContext(PlasmaDonorContext);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<View style={styles.containerTop}>
					<Text h1 style={styles.headingStyle}>
						Plasma
					</Text>
					<Spacer />
					<Text style={styles.shortcutBannerStyle}>Shortcuts</Text>
					<ShortcutBar
						title1="Search Donor"
						title2="Donate Plasma"
						iconName1="search"
						iconName2="hand-holding-heart"
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
								}}
								value={searchCity}
								onChangeText={(city) => setSearchCity(city)}
								onSubmitEditing={() => {
									console.log(searchCity.toLocaleLowerCase());
									getDonorListFromCity(searchCity.toLocaleLowerCase());
								}}
							></Input>

							<FlatList
								data={state.donorList[0]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <Text>{item.name}</Text>;
								}}
							/>
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
	},
});
export default PlasmaScreen;
