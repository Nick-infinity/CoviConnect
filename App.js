import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DonorDashBoardScreen from './src/screen/DonorDashBoardScreen';
import SignupScreen from './src/screen/SiginupScreen';
import SigninScreen from './src/screen/SigninScreen';
import OxygenScreen from './src/screen/OxygenScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import PlasmaScreen from './src/screen/PlasmaScreen';
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
				<Tab.Navigator tabBarOptions={customTabBarStyle}>
					<Tab.Screen name="Plasma" component={PlasmaScreen} />
					<Tab.Screen name="Oxygen" component={OxygenScreen} />
					<Tab.Screen name="Dashboard" component={DonorDashBoardScreen} />
					<Tab.Screen name="Settings" component={SettingsScreen} />
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
};
const customTabBarStyle = {
	activeTintColor: '#272727',
	inactiveTintColor: 'gray',
	style: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'white',
		position: 'absolute',
		bottom: 0,
		padding: 10,
		height: 70,
		zIndex: 8,
	},
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
