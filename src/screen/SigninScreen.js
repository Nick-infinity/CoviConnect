import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Text, Input, Button, Icon } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SigninScreen = ({ navigation }) => {
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const { state, signin } = useContext(AuthContext);
	const [valid, Setvalid] = useState(-1);

	const isMobileValid = (mb) => {
		const pattern = new RegExp('^[0-9]{10}$');
		return pattern.test(mb);
	};

	const isValid = () => {
		const mobileValidity = isMobileValid(mobile);

		if (mobileValidity === true && password !== '') {
			Setvalid(1);
		} else {
			Setvalid(0);
		}

		if (valid === 1) {
			Setvalid(-1);
			signin({ mobile, password });
		}
	};
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
				keyboardType="number-pad"
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Registred Mobile number"
				style={styles.inputStyle}
				label="Registered Mobile"
				value={mobile}
				onChangeText={(text) => setMobile(text)}
				inputContainerStyle={inputStyle}
			/>

			<Input
				secureTextEntry
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Password"
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
				inputContainerStyle={inputStyle}
			/>
			{valid === 0 ? (
				<Text style={styles.errorStyle}>Invalid mobile or password</Text>
			) : null}
			{state.errorMessage ? (
				<Text style={styles.errorStyle}>{state.errorMessage}</Text>
			) : null}
			<Spacer>
				<Button title="Login" onPress={() => isValid()} />
			</Spacer>
			<TouchableOpacity
				onPress={() => {
					Setvalid(-1);
					setMobile('');
					setPassword('');
					navigation.navigate('Signup');
				}}
			>
				<Text style={{ color: 'gray', alignSelf: 'center' }}>
					Not a user? Sign Up
				</Text>
			</TouchableOpacity>
		</View>
	);
};
const inputStyle = {
	borderBottomWidth: 1,
	borderWidth: 1,
	borderColor: 'gray',
	borderRadius: 15,
	paddingHorizontal: 10,
	paddingVertical: 5,
	marginTop: 10,
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
		marginHorizontal: 10,
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
		marginHorizontal: 10,
	},
});
export default SigninScreen;
