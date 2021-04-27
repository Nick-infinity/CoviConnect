import React, { useContext } from 'react';
import { Button } from 'react-native';
import { Text, StyleSheet, View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonorDashBoardScreen = () => {
	const { state, signout } = useContext(AuthContext);
	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			{/* <Text>AccountsScreen</Text> */}
			<Button title="Logout" onPress={() => signout()} />
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({});
export default DonorDashBoardScreen;
