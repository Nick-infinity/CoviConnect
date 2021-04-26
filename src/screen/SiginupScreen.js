import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { state, signup } = useContext(AuthContext);

	return (
		<View>
			<TextInput value={email} onChangeText={(text) => setEmail(text)} />
			<TextInput value={password} onChangeText={(text) => setPassword(text)} />

			<Button title="Sigunup" onPress={() => signup({ email, password })} />
		</View>
	);
};
const styles = StyleSheet.create({});
export default SignupScreen;
