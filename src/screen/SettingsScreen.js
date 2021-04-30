import React, { useContext } from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = () => {
	const { signout } = useContext(AuthContext);

	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<Button title="Logout" onPress={() => signout()} />
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({});
export default SettingsScreen;
