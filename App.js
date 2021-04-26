import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AccountsScreen from './src/screen/AccountsScreen';
import SignupScreen from './src/screen/SiginupScreen';
import SigninScreen from './src/screen/SigninScreen';
import TrackCreateScreen from './src/screen/TrackCreateScreen';
import TrackDetailsScreen from './src/screen/TrackDetailsScreen';
import TrackListScreen from './src/screen/TrackListScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Context as AuthContext } from './src/context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
	// read token from our storage
	const getToken = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			return token != null ? JSON.parse(token) : null;
		} catch (e) {
			// error reading value
		}
	};

	if (getToken === null) {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Signup"
						component={SignupScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Signin"
						component={SigninScreen}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	} else {
		return (
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen name="TrackList" component={TrackListScreen} />
					<Tab.Screen name="TrackCreate" component={TrackCreateScreen} />
					<Tab.Screen name="Account" component={AccountsScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default () => {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
};
