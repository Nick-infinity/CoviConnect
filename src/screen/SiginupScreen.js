import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Text, Input, Button, Icon } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { useSafeArea } from 'react-native-safe-area-context';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mobile, setMobile] = useState('');
	const { state, signup } = useContext(AuthContext);
	const [valid, Setvalid] = useState(-1);

	const isEmailValid = (em) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(em);
	};
	const isMobileValid = (num) => {
		const pattern = new RegExp('^[0-9]{10}$');
		return pattern.test(num);
	};

	const isValid = () => {
		const mobileValid = isMobileValid(mobile);
		const emailValid = isEmailValid(email);
		if (mobileValid && emailValid && password !== '') {
			console.log('VAlid regex');
			Setvalid(-1);
			signup({ mobile, email, password });
		} else {
			console.log('Invalid regex');
			Setvalid(0);
		}
	};

	return (
		<View style={styles.container}>
			<Text h1 style={styles.appNameStyle}>
				Covid Helper
			</Text>

			<Spacer>
				<Text h3 style={styles.bannerStyle}>
					Sign Up for new account
				</Text>
			</Spacer>
			<Spacer />

			<Input
				keyboardType="number-pad"
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Enter mobile for registration"
				style={styles.inputStyle}
				label="Mobile Number"
				value={mobile}
				onChangeText={(text) => {
					setMobile(text);
				}}
				inputContainerStyle={inputStyle}
			/>
			<Input
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Enter Email"
				style={styles.inputStyle}
				label="Email"
				value={email}
				onChangeText={(text) => {
					setEmail(text);
				}}
				inputContainerStyle={inputStyle}
			/>

			<Input
				secureTextEntry
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Enter Password"
				label="Password"
				value={password}
				onChangeText={(text) => setPassword(text)}
				inputContainerStyle={inputStyle}
			/>
			{valid === 0 ? (
				<Text style={styles.errorStyle}>Invalid mobile, email or password</Text>
			) : null}

			{state.errorMessage ? (
				<Text style={styles.errorStyle}>{state.errorMessage}</Text>
			) : null}
			<Spacer>
				<TouchableOpacity style={styles.btnStyle} onPress={() => isValid()}>
					<View style={styles.btnContainer}>
						<Text h4 style={styles.btnTextStyle}>
							Signup
						</Text>
					</View>
				</TouchableOpacity>
			</Spacer>

			<TouchableOpacity
				onPress={() => {
					Setvalid(-1);
					setMobile('');
					setPassword('');
					setEmail('');
					navigation.navigate('Signin');
				}}
			>
				<Text style={{ color: 'gray', alignSelf: 'center' }}>
					Already have an account? Log in instead
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
	btnContainer: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: 'gray',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginHorizontal: 40,
		alignItems: 'center',
		backgroundColor: '#67b3ff',
	},
	btnTextStyle: {
		color: 'white',
	},
});
export default SignupScreen;
