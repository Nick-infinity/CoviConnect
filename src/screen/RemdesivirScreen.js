import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Icon, ButtonGroup } from 'react-native-elements';
import { FlatList } from 'react-native';

import Spacer from '../components/Spacer';
import { Context as PlasmaDonorContext } from '../context/PlasmaDonorContext';
import PlasmaDonorCardHospital from '../components/PlasmaDonorCardHospital';

const RemdesivirScreen = ({ navigation }) => {
	// for search
	const [searchCity, setSearchCity] = useState('');
	const { state } = useContext(PlasmaDonorContext);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<View style={styles.containerTop}>
					<Text h1 style={styles.headingStyle}>
						REMDESIVIR
					</Text>

					<Text style={styles.shortcutBannerStyle}>
						Find Remdesivir Supplier
					</Text>
				</View>

				<View style={styles.containerBottom}>
					<View style={styles.resultScreen}>
						<Input
							leftIcon={
								<Icon name="search" type="material" size={30} color="black" />
							}
							placeholderTextColor="gray"
							placeholder="Enter your city name"
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

						<Spacer />
						{state.responseMsg === 'Something went wrong. Please try again' ||
						state.responseMsg ===
							'Cant find donors in your area.\n Enter proper city name or try with nearby city.' ? (
							<Text style={styles.errorMesg}>{state.responseMsg}</Text>
						) : null}

						<FlatList
							style={styles.flatList}
							numColumns={2}
							data={state.donorList[0]}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => {
								return <PlasmaDonorCardHospital item={item} />;
							}}
						/>
					</View>

					<View style={styles.formContainer}></View>
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
		marginBottom: windowHeight / 7,
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
export default RemdesivirScreen;
