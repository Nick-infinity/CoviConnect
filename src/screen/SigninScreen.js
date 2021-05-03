import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import {Text, Input} from 'react-native-elements';
import Spacer from '../components/Spacer';

const SigninScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const {state, signin} = useContext(AuthContext);
  const [valid, Setvalid] = useState(-1);

  const isMobileValid = num => {
    console.log('checking regex');
    const pattern = RegExp('^[0-9]{10}$');
    return pattern.test(num);
  };

  const isValid = () => {
    console.log('pressed sigin');
    const res = isMobileValid(mobile);
    if (res && password !== '') {
      console.log('valid regex');
      signin({mobile, password});
      Setvalid(-1);
    } else {
      console.log('Regx reject');
      Setvalid(0);
    }
  };
  return (
    // <SafeAreaView forceInset={{top: 'always'}}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     // backgroundColor={isDarkMode ?
    //   />
    <View style={styles.container}>
      <StatusBar backgroundColor="#aaaaaa" />
      <Text h1 style={styles.appNameStyle}>
        Covid Helper
      </Text>

      <Spacer>
        <Text h3 style={styles.bannerStyle}>
          Log in your account
        </Text>
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
        onChangeText={text => {
          setMobile(text);
        }}
        inputContainerStyle={inputStyle}
      />

      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        inputContainerStyle={inputStyle}
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
            <Text h4 style={styles.btnTextStyle}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </Spacer>
      <TouchableOpacity
        onPress={() => {
          Setvalid(-1);
          setMobile('');
          setPassword('');
          navigation.navigate('Signup');
        }}>
        <Text style={{color: 'gray', alignSelf: 'center'}}>
          New user? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
  );
};
const inputStyle = {
  borderBottomWidth: 1,
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 15,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginTop: 10,
};
const styles = StyleSheet.create({
  bannerStyle: {
    alignSelf: 'center',
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 30,
    // paddingHorizontal: 10,
    // paddingVertical: 3,
  },
  inputStyle: {},
  container: {
    marginTop: 40,
    justifyContent: 'center',
    marginHorizontal: 10,
    // borderColor: 'red',
    // borderWidth: 10,
  },
  appNameStyle: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 1,
  },
  errorStyle: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  btnContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 40,
    alignItems: 'center',
    backgroundColor: '#67b3ff',
  },
  btnTextStyle: {
    color: 'white',
  },
});
export default SigninScreen;
