import React, { useContext, useState, useEffect, useFocusEffect } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as userPostsContext } from '../context/PlasmaDonorContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';

const DonorDashBoardScreen = ({ navigation }) => {
	const [screenState, setScreenState] = useState(0);
	const { getUserPosts, state, userResponseMesg } = useContext(
		userPostsContext
	);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getUserPosts();
		});
		return unsubscribe;
	}, []);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<View style={styles.containerTop}>
					<Text h1 style={styles.headingStyle}>
						Dashboard
					</Text>
					<Text style={styles.shortcutBannerStyle}>Manage donor posts</Text>
					<ShortcutBar
						title1="Plasma Posts"
						title2="Oxygen Posts"
						iconName1="tint"
						iconName2="lungs"
						onClick1={() => {
							setScreenState(0);
						}}
						onClick2={() => {
							setScreenState(1);
						}}
					/>
				</View>

				<View style={styles.containerBottom}>
					<View style={styles.resultScreen}>
						{screenState === 0 ? (
							<FlatList
								data={state.userPosts[0]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return (
										<View>
											<Text>Plasma</Text>
										</View>
									);
								}}
							/>
						) : null}
						{screenState === 1 ? (
							<FlatList
								data={state.userPosts[1]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return (
										<View>
											<Text>Oxygen</Text>
										</View>
									);
								}}
							/>
						) : null}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
	shortcutBannerStyle: {
		marginLeft: 10,
		fontSize: 18,
		color: 'gray',
		fontWeight: '600',
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
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: 20,
		marginBottom: windowHeight / 5.5,
		borderColor: 'red',
		borderWidth: 5,
	},
});
export default DonorDashBoardScreen;
