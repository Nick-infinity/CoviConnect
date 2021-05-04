/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, PermissionsAndroid } from 'react-native';
import DonorDashBoardScreen from './src/screen/DonorDashBoardScreen';
import SignupScreen from './src/screen/SiginupScreen';
import SigninScreen from './src/screen/SigninScreen';
import OxygenScreen from './src/screen/OxygenScreen';
import SettingsScreen from './src/screen/SettingsScreen';
import PlasmaScreen from './src/screen/PlasmaScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as PlasmaDonorProvider } from './src/context/PlasmaDonorContext';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Context as AuthContext } from './src/context/AuthContext';
import ResolveAuthScreen from './src/screen/ResolveAuthScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PlasmaHospital from './src/screen/forms/PlasmaHospital';
import PlasmaOrganization from './src/screen/forms/PlasmaOrganization';
import PlasmaIndividual from './src/screen/forms/PlasmaIndividual';
import OxygenInidividual from './src/screen/forms/OxygenInidividual';
import OxygenOrganization from './src/screen/forms/OxygenOrganization';
import OxygenHospital from './src/screen/forms/OxygenHospital';
import RemdesivirScreen from './src/screen/RemdesivirScreen';
import { Icon } from 'react-native-elements';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DonorCategoryStack = createStackNavigator();

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TabScreens = () => {
	return (
		<Tab.Navigator tabBarOptions={customTabBarStyle}>
			<Tab.Screen
				name="Plasma"
				component={PlasmaScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name="tint" type="font-awesome-5" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Oxygen"
				component={OxygenScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="lungs"
							type="font-awesome-5"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Remdesivir"
				component={RemdesivirScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="syringe"
							type="font-awesome-5"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Dashboard"
				component={DonorDashBoardScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon
							name="user-cog"
							type="font-awesome-5"
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="About"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Icon name="bars" type="font-awesome-5" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export async function request_location_runtime_permission() {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			return;
		} else {
			Alert.alert(
				'Storage Permission',
				'Please allow storage permission for app to work normally',
				[
					{
						text: 'OK',
						onPress: () => {
							PermissionsAndroid.request(
								PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

								PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
							);
						},
						style: 'ok',
					},
				],
				{
					//   cancelable: true,
					//   onDismiss: () =>
					//     Alert.alert(
					//       'This alert was dismissed by tapping outside of the alert dialog.',
					//     ),
				}
			);
		}
	} catch (err) {
		console.warn(err);
	}
}

const App = () => {
	//permission hook
	useEffect(() => {
		request_location_runtime_permission();
	}, []);

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
						component={OxygenOrganization}
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
	safeAreaInsets: 'bottom',

	style: {
		borderTopLeftRadius: windowWidth * 0.05,
		borderTopRightRadius: windowWidth * 0.05,
		backgroundColor: 'white',

		position: 'absolute',
		bottom: 0,

		padding: windowWidth * 0.01,
		height: windowHeight * 0.075,
		zIndex: 8,
		paddingBottom: windowHeight * 0.01,
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
				<PlasmaDonorProvider>
					<App />
				</PlasmaDonorProvider>
			</SafeAreaProvider>
		</AuthProvider>
	);
};
