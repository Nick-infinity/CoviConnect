import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountsScreen from './src/screen/AccountsScreen';
import SignupScreen from './src/screen/SiginupScreen';
import SiginScreen from './src/screen/SigninScreen';
import TrackCreateScreen from './src/screen/TrackCreateScreen';
import TrackDetailsScreen from './src/screen/TrackDetailsScreen';
import TrackListScreen from './src/screen/TrackListScreen';

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Open up App.js to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
