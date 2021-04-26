import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Text, Input, Button, Icon } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SigninScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { state, signin } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<Text h1 style={styles.appNameStyle}>
				Tracker
			</Text>

			<Spacer>
				<Text h3 style={styles.bannerStyle}>
					Log in your account
				</Text>
			</Spacer>
			<Spacer />
			<Input
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Enter Email"
				style={styles.inputStyle}
				label="Email"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Spacer />
			<Input
				secureTextEntry
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Enter Password"
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			{state.errorMessage ? (
				<Text style={styles.errorStyle}>{state.errorMessage}</Text>
			) : null}
			<Spacer>
				<Button title="Login" onPress={() => signin({ email, password })} />
			</Spacer>
			<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
				<Text style={{ color: 'gray', alignSelf: 'center' }}>
					Not a user? Sign Up
				</Text>
			</TouchableOpacity>
		</View>
	);
};
const styles = StyleSheet.create({
	bannerStyle: {
		alignSelf: 'center',
		// borderWidth: 1,
		// borderColor: 'gray',
		// borderRadius: 30,
		// paddingHorizontal: 10,
		// paddingVertical: 3,
	},
	inputStyle: {},
	container: {
		marginTop: 80,
		justifyContent: 'center',
		// borderColor: 'red',
		// borderWidth: 10,
	},
	appNameStyle: {
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 15,
		paddingHorizontal: 20,
		paddingVertical: 1,
	},
	errorStyle: {
		fontSize: 16,
		color: 'red',
		alignSelf: 'center',
	},
});
export default SigninScreen;
