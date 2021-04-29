import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import { Provider as PlasmaDonorProvider } from '../context/PlasmaDonorContext';
import DonorTypeSelector from '../components/DonorTypeSelector';
import Spacer from '../components/Spacer';

const PlasmaScreen = ({ navigation }) => {
	// for cehcking which screen is running
	const [screenState, setScreenState] = useState(0);
	// 0 for search screen
	// 1 for donor screen

	// for Category Selection
	const [categoryState, setCategoryState] = useState(-1);
	// -1 for none
	//0 for hospital
	// 1 for org
	// 2 for individul

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
				<ScrollView>
					<View style={styles.containerBottom}>
						{screenState === 0 ? (
							<View style={styles.resultScreen}>
								<Input
									leftIcon={
										<Icon
											name="search-location"
											type="font-awesome-5"
											size={24}
											color="black"
										/>
									}
									placeholderTextColor="gray"
									placeholder="Search Pincode/City/State"
									style={styles.searchStyle}
									inputContainerStyle={{ borderBottomWidth: 0 }}
								></Input>
								<FlatList />
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
				</ScrollView>
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
		backgroundColor: 'white',
		padding: 10,
	},
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: 20,
	},
});
export default PlasmaScreen;
