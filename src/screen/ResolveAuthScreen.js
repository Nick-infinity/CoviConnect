import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = ({ navigation }) => {
	const { trylocalSignin } = useContext(AuthContext);

	//try local token
	useEffect(() => {
		trylocalSignin(() => {
			navigation.navigate('Signin');
			navigation.reset({
				index: 0,
				routes: [{ name: 'Signin' }],
			});
		});
	}, []);
	return null;
};

export default ResolveAuthScreen;
