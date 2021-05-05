import React from 'react';
import { View, ToastAndroid, Platform, AlertIOS } from 'react-native';

export const ToastMsg = (msg) => {
	if (Platform.OS === 'android') {
		ToastAndroid.show(msg, ToastAndroid.SHORT);
	} else {
		AlertIOS.alert(msg);
	}
};
