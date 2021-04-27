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
import ResolveAuthScreen from './src/screen/ResolveAuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PlasmaDonorScreen from './src/screen/PlasmaDonorScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
	const { state } = useContext(AuthContext);
	const token = state.token;
	if (token === null) {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="ResolveAuth"
						component={ResolveAuthScreen}
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
					<Stack.Screen
						name="Signup"
						component={SignupScreen}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}

	if (token !== null) {
		return (
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen name="TrackList" component={PlasmaDonorScreen} />
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
			<SafeAreaProvider>
				<App />
			</SafeAreaProvider>
		</AuthProvider>
	);
};
