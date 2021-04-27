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
import DonorTypeSelector from './src/components/DonorTypeSelector';
import PlasmaHospital from './src/screen/forms/PlasmaHospital';
import PlasmaOrganization from './src/screen/forms/PlasmaOrganization';
import PlasmaIndividual from './src/screen/forms/PlasmaIndividual';
import OxygenInidividual from './src/screen/forms/OxygenInidividual';
import OxyegenOrganization from './src/screen/forms/OxyegenOrganization';
import OxygenHospital from './src/screen/forms/OxygenHospital';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DonorCategoryStack = createStackNavigator();

const TabScreens = () => {
	return (
		<Tab.Navigator tabBarOptions={customTabBarStyle}>
			<Tab.Screen name="PlasmaScreen" component={PlasmaScreen} />
			<Tab.Screen name="OxygenScreen" component={OxygenScreen} />
			<Tab.Screen name="Dashboard" component={DonorDashBoardScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
};
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
				<DonorCategoryStack.Navigator>
					<DonorCategoryStack.Screen
						name="TabScreens"
						component={TabScreens}
						options={{ headerShown: false }}
					/>
					<DonorCategoryStack.Screen
						name="PDhospital"
						component={PlasmaHospital}
						options={{
							headerShown: false,
						}}
					/>
					<DonorCategoryStack.Screen
						name="PDorganization"
						component={PlasmaOrganization}
						options={{
							headerShown: false,
						}}
					/>
					<DonorCategoryStack.Screen
						name="PDindividual"
						component={PlasmaIndividual}
						options={{
							headerShown: false,
						}}
					/>
					<DonorCategoryStack.Screen
						name="ODindividual"
						component={OxygenInidividual}
						options={{
							headerShown: false,
						}}
					/>
					<DonorCategoryStack.Screen
						name="ODorganization"
						component={OxyegenOrganization}
						options={{
							headerShown: false,
						}}
					/>
					<DonorCategoryStack.Screen
						name="ODhospital"
						component={OxygenHospital}
						options={{
							headerShown: false,
						}}
					/>
				</DonorCategoryStack.Navigator>
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
