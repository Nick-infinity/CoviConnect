import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native';
import ShortcutBar from '../components/ShortcutBar';
import OxygenDonorScreen from './OxygenDonorScreen';

const OxygenScreen = () => {
	// for cehcking which screen is running
	const [screenState, setScreenState] = useState(0);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<ScrollView>
				<View style={styles.container}>
					<Text h1 style={styles.headingStyle}>
						Oxygen
					</Text>
					<Text style={styles.shortcutBannerStyle}>Shortcuts</Text>
					<ShortcutBar
						title1="Search Oxygen"
						title2="Provide Oxygen "
						iconName1="search"
						iconName2="hand-holding-heart"
						onClick1={() => setScreenState(0)}
						onClick2={() => setScreenState(1)}
					/>
					{!screenState ? (
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
						<View>
							<OxygenDonorScreen />
						</View>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	headingStyle: {
		marginLeft: 10,
		marginTop: 5,
	},
	container: {
		flex: 1,
		borderColor: 'red',
		borderWidth: 4,
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
export default OxygenScreen;
