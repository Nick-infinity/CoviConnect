import React, { useContext } from 'react';
import { Button } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const AccountsScreen = () => {
	const { state, signout } = useContext(AuthContext);
	return (
		<View style={{ marginTop: 400 }}>
			<Text>AccountsScreen</Text>
			<Button title="Logout" onPress={() => signout()} />
		</View>
	);
};
const styles = StyleSheet.create({});
export default AccountsScreen;
