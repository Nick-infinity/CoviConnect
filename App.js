import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountsScreen from './src/screen/AccountsScreen';
import SignupScreen from './src/screen/SiginupScreen';
import SiginScreen from './src/screen/SigninScreen';
import TrackCreateScreen from './src/screen/TrackCreateScreen';
import TrackDetailsScreen from './src/screen/TrackDetailsScreen';
import TrackListScreen from './src/screen/TrackListScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			{/* <Stack.Navigator>
				<Stack.Screen name="Sigin" component={SiginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
			</Stack.Navigator>
			<Tab.Navigator>
				<Tab.Screen name="TrackList" component={TrackListScreen} />
				<Tab.Screen name="TrackCreate" component={TrackCreateScreen} />
				<Tab.Screen name="Account" component={AccountsScreen} />
			</Tab.Navigator> */}
		</NavigationContainer>
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
