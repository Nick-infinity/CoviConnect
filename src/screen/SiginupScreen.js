import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Text, Input, Button, Icon } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { state, signup, trylocalSignin } = useContext(AuthContext);

	// try local sigin when we load a sigin up screen
	useEffect(() => {
		trylocalSignin();
	}, []);

	return (
		<View style={styles.container}>
			<Text h1 style={styles.appNameStyle}>
				Tracker
			</Text>

			<Spacer>
				<Text h3 style={styles.bannerStyle}>
					Sign Up for new account
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
				<Button title="Sign Up" onPress={() => signup({ email, password })} />
			</Spacer>

			<TouchableOpacity onPress={() => navigation.navigate('Signin')}>
				<Text style={{ color: 'gray', alignSelf: 'center' }}>
					Already have an account? Log in instead
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
export default SignupScreen;
