import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TrackListScreen = () => {
	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<Button title="Logout" />
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({});
export default TrackListScreen;
