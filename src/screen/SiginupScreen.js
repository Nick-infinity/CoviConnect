import React, { useState, useContext } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Dimensions,
} from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { Text, Input, ButtonGroup } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { RFPercentage } from 'react-native-responsive-fontsize';

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mobile, setMobile] = useState('');
	const { state, signup } = useContext(AuthContext);
	const [valid, Setvalid] = useState(-1);
	const [typeIndex, setTypeIndex] = useState(-1);
	const userTypes = ['Individual', 'Organization', 'Hospital'];

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
		if (mobileValid && emailValid && password !== '' && typeIndex !== -1) {
			console.log('VAlid regex');
			Setvalid(-1);
			signup({ mobile, email, password, type: typeIndex });
		} else {
			console.log('Invalid regex');
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
						<Text style={styles.bannerStyle}>Sign Up for new account</Text>
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
						labelStyle={{ fontSize: RFPercentage(2) }}
						inputStyle={{ fontSize: RFPercentage(2.5) }}
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
						labelStyle={{ fontSize: RFPercentage(2) }}
						inputStyle={{ fontSize: RFPercentage(2.5) }}
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
						labelStyle={{ fontSize: RFPercentage(2) }}
						inputStyle={{ fontSize: RFPercentage(2.5) }}
					/>
					<Text style={styles.btnGrpBannerStyle}>User category</Text>
					<ButtonGroup
						style={styles.btnGroupStyle}
						label="Donor Gender"
						onPress={(num) => setTypeIndex(num)}
						selectedIndex={typeIndex}
						buttons={userTypes}
						containerStyle={btnGroupStyle}
					/>
					{valid === 0 ? (
						<Text style={styles.errorStyle}>
							Invalid mobile, email, password or category
						</Text>
					) : null}

					{state.errorMessage ? (
						<Text style={styles.errorStyle}>{state.errorMessage}</Text>
					) : null}
					<Spacer>
						<TouchableOpacity style={styles.btnStyle} onPress={() => isValid()}>
							<View style={styles.btnContainer}>
								<Text style={styles.btnTextStyle}>Signup</Text>
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
						<Text
							style={{
								color: 'gray',
								alignSelf: 'center',
								fontSize: RFPercentage(2),
							}}
						>
							Already have an account? Log in instead
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const btnGroupStyle = {
	marginBottom: windowHeight * 0.03,
	height: windowHeight * 0.055,
	borderRadius: 12,
};
const inputStyle = {
	borderBottomWidth: 1,
	borderWidth: 1,
	borderColor: 'gray',
	borderRadius: 15,
	paddingHorizontal: windowWidth * 0.03,
	paddingVertical: windowHeight * 0.004,
	marginBottom: -windowHeight * 0.013,
	marginTop: windowHeight * 0.01,
};
const styles = StyleSheet.create({
	bannerStyle: {
		alignSelf: 'center',
		fontSize: RFPercentage(4.5),
		fontWeight: 'bold',
	},
	btnGrpBannerStyle: {
		fontSize: RFPercentage(2),
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: 10,
		marginBottom: windowHeight * 0.015,
	},

	container: {
		marginBottom: windowHeight * 0.03,

		marginTop: windowHeight * 0.05,
		justifyContent: 'center',
		marginHorizontal: windowWidth * 0.03,
		// borderColor: 'red',
		// borderWidth: 10,
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
export default SignupScreen;
