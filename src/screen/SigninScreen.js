import React, { useState, useContext } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	Dimensions,
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Text, Input } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';

const SigninScreen = ({ navigation }) => {
	const [mobile, setMobile] = useState('');
	const [password, setPassword] = useState('');
	const { state, signin } = useContext(AuthContext);
	const [valid, Setvalid] = useState(-1);

	const isMobileValid = (num) => {
		console.log('checking regex');
		const pattern = RegExp('^[0-9]{10}$');
		return pattern.test(num);
	};

	const isValid = () => {
		console.log('pressed sigin');
		const res = isMobileValid(mobile);
		if (res && password !== '') {
			console.log('valid regex');
			signin({ mobile, password });
			Setvalid(-1);
		} else {
			console.log('Regx reject');
			Setvalid(0);
		}
	};
	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<StatusBar backgroundColor="#aaaaaa" />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<Text style={styles.appNameStyle}>CoviConnect</Text>

					<Spacer>
						<Text style={styles.bannerStyle}>Log in your account</Text>
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
						onChangeText={(text) => {
							setMobile(text);
						}}
						inputContainerStyle={inputStyle}
						labelStyle={{ fontSize: RFPercentage(2) }}
						inputStyle={{ fontSize: RFPercentage(2.5) }}
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
						labelStyle={{ fontSize: RFPercentage(2) }}
						inputStyle={{ fontSize: RFPercentage(2.5) }}
					/>
					{valid === 0 ? (
						<Text style={styles.errorStyle}>Invalid mobile or password</Text>
					) : null}
					{state.errorMessage ? (
						<Text style={styles.errorStyle}>{state.errorMessage}</Text>
					) : null}
					<Spacer>
						<TouchableOpacity style={styles.btnStyle} onPress={() => isValid()}>
							<View style={styles.btnContainer}>
								<Text style={styles.btnTextStyle}>Login</Text>
							</View>
						</TouchableOpacity>
					</Spacer>
					<TouchableOpacity
						onPress={() => {
							Setvalid(-1);
							setMobile('');
							setPassword('');
							navigation.navigate('Signup');
						}}
					>
						<Text
							style={{
								color: 'gray',
								alignSelf: 'center',
								fontSize: RFPercentage(2),
							}}
						>
							New user? Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const inputStyle = {
	borderBottomWidth: 1,
	borderWidth: 1,
	borderColor: 'gray',
	borderRadius: 15,
	paddingHorizontal: windowWidth * 0.03,
	paddingVertical: windowHeight * 0.004,
	marginTop: windowHeight * 0.013,
};
const styles = StyleSheet.create({
	bannerStyle: {
		alignSelf: 'center',
		fontSize: RFPercentage(4.5),
		fontWeight: 'bold',
	},
	inputStyle: {},
	container: {
		marginTop: windowHeight * 0.05,
		justifyContent: 'center',
		marginHorizontal: windowWidth * 0.03,
	},
	appNameStyle: {
		fontSize: RFPercentage(5),
		fontWeight: 'bold',
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 15,
		paddingHorizontal: windowWidth * 0.06,
		paddingVertical: 1,
	},
	errorStyle: {
		fontSize: RFPercentage(2.3),
		color: 'red',
		alignSelf: 'center',
		marginHorizontal: windowWidth * 0.03,
	},
	btnContainer: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: 'gray',
		paddingHorizontal: windowWidth * 0.06,
		paddingVertical: windowHeight * 0.01,
		marginHorizontal: windowWidth * 0.1,
		alignItems: 'center',
		backgroundColor: '#67b3ff',
	},
	btnTextStyle: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: RFPercentage(3.5),
	},
});
export default SigninScreen;
