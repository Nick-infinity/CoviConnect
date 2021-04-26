import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';

const PlasmaDonorScreen = () => {
	return (
		<SafeAreaView>
			<Input
				placeholder="Enter Name"
				style={styles.inputStyle}
				label="Name"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Input
				placeholder="Enter Age"
				style={styles.inputStyle}
				label="Age"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Input
				placeholder="Enter Gender"
				style={styles.inputStyle}
				label="Gender"
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
		</SafeAreaView>
	);
};

export default PlasmaDonorScreen;
