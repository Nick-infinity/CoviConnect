import React, {useState, useContext} from 'react';
import {View, StyleSheet, Dimensions, Linking} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Input, Icon} from 'react-native-elements';
import ShortcutBar from '../components/ShortcutBar';
import {FlatList, StatusBar} from 'react-native';

import {Context as PlasmaDonorContext} from '../context/PlasmaDonorContext';
import RemdesivirCard from '../components/RemdesivirCard';
import RemdesivirProviderForm from '../screen/forms/RemdesivirProviderForm';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RemdesivirScreen = ({navigation}) => {
  // for cehcking which screen is running
  const [screenState, setScreenState] = useState(0);

  // 0 for search screen
  // 1 for donor screen

  // for search
  const [searchCity, setSearchCity] = useState('');
  const {getremdesivir, state} = useContext(PlasmaDonorContext);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <StatusBar backgroundColor="#aaaaaa" />

      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text h1 style={styles.headingStyle}>
            REMDESIVIR
          </Text>

          <Text style={styles.shortcutBannerStyle}>
            Find Or Provide Remdesivir
          </Text>
          <ShortcutBar
            title1="Search Remdesivir"
            title2="Provide Remdesivir"
            iconName1="search"
            iconName2="hand-holding-medical"
            onClick1={() => {
              setScreenState(0);
            }}
            onClick2={() => {
              setScreenState(1);
            }}
          />
        </View>

        <View style={styles.containerBottom}>
          {screenState === 0 ? (
            <View style={styles.resultScreen}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://drive.google.com/file/d/1Uu0u2hsE3f-sgU52en6tuWPavo5y-fe0/view?usp=sharing`,
                  );
                }}
                style={[styles.btnNormal]}>
                <View style={styles.ShortcutContainer}>
                  <Icon
                    color="white"
                    name="file-alt"
                    type="font-awesome-5"
                    style={[styles.iconStyle]}
                  />
                  <Text style={[styles.titleStyle]}>
                    Click to find remdesivir distributor list
                  </Text>
                </View>
              </TouchableOpacity>
              <Input
                leftIcon={
                  <Icon name="search" type="material" size={30} color="black" />
                }
                placeholderTextColor="gray"
                placeholder="Enter your city to find providers"
                style={styles.searchStyle}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  marginBottom: -10,
                }}
                value={searchCity}
                onChangeText={city => setSearchCity(city)}
                onSubmitEditing={() => {
                  console.log(searchCity.toLocaleLowerCase());
                  getremdesivir(searchCity.toLocaleLowerCase());
                }}></Input>

              {state.responseMsg === 'Something went wrong. Please try again' ||
              state.responseMsg ===
                'Cant find donors in your area.\n Enter proper city name or try with nearby city.' ? (
                <Text style={styles.errorMesg}>{state.responseMsg}</Text>
              ) : null}

              <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.flatList}
                numColumns={2}
                data={state.remdesivirList}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                  return <RemdesivirCard item={item} />;
                }}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <RemdesivirProviderForm />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const btnGroupStyle = {
  marginBottom: -10,
  height: 40,
  borderRadius: 12,
};

const styles = StyleSheet.create({
  Overlaytext: {
    marginHorizontal: 10,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  headingStyle: {
    marginLeft: 10,
    marginTop: 5,
  },
  container: {
    height: '100%',
    marginTop: 10,
  },
  containerTop: {
    marginBottom: 10,
  },
  containerBottom: {
    marginBottom: 80,
    marginHorizontal: 10,
    flex: 1,
  },
  shortcutBannerStyle: {
    marginLeft: 10,
    fontSize: 18,
    color: 'gray',
    fontWeight: '600',
  },
  searchStyle: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchStyleCity: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  resultScreen: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: windowHeight / 6.2,
  },
  flatList: {
    alignSelf: 'center',
  },
  errorMesg: {
    color: 'red',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
  ShortcutContainer: {
    padding: 10,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    //alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  btnNormal: {
    borderColor: '#272727',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#272727',
  },
  titleStyle: {
    marginTop: 5,
    color: 'white',
  },
});
export default RemdesivirScreen;

// import React, { useState, useContext } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Text, Input, Icon } from 'react-native-elements';
// import { FlatList } from 'react-native';
// import RemdesivirCard from '../components/RemdesivirCard';
// import Spacer from '../components/Spacer';
// import { Context as RemdesivirContext } from '../context/PlasmaDonorContext';

// const RemdesivirScreen = () => {
// 	// for search
// 	const [searchCity, setSearchCity] = useState('');
// 	const { state, getremdesivir } = useContext(RemdesivirContext);

// 	return (
// 		<SafeAreaView forceInset={{ top: 'always' }}>
// 			<View style={styles.container}>
// 				<View style={styles.containerTop}>
// 					<Text h1 style={styles.headingStyle}>
// 						REMDESIVIR
// 					</Text>

// 					<Text style={styles.shortcutBannerStyle}>
// 						Find Remdesivir Supplier
// 					</Text>
// 				</View>

// 				<View style={styles.containerBottom}>
// 					<View style={styles.resultScreen}>
// 						<Input
// 							leftIcon={
// 								<Icon name="search" type="material" size={30} color="black" />
// 							}
// 							placeholderTextColor="gray"
// 							placeholder="Enter your city name"
// 							style={styles.searchStyle}
// 							inputContainerStyle={{
// 								borderBottomWidth: 0,
// 								marginBottom: -10,
// 							}}
// 							value={searchCity}
// 							onChangeText={(city) => setSearchCity(city)}
// 							onSubmitEditing={() => {
// 								console.log(searchCity.toLocaleLowerCase());
// 								getremdesivir(searchCity.toLocaleLowerCase());
// 							}}
// 						></Input>

// 						<Spacer />
// 						{state.remdesivirErrorMesg ===
// 							'Something went wrong. Please try again' ||
// 						state.remdesivirErrorMesg === 'No supplier found in your area.' ? (
// 							<Text style={styles.errorMesg}>{state.remdesivirErrorMesg}</Text>
// 						) : null}

// 						{/* <FlatList
// 							showsVerticalScrollIndicator={false}
// 							style={styles.flatList}
// 							numColumns={2}
// 							data={state.remdesivirList}
// 							keyExtractor={(item) => item._id}
// 							renderItem={({ item }) => {
// 								return <RemdesivirCard item={item} />;
// 							}}
// 						/> */}
// 					</View>

// 					<View style={styles.formContainer}></View>
// 				</View>
// 			</View>
// 		</SafeAreaView>
// 	);
// };

// const windowWidth = Dimensions.get('screen').width;
// const windowHeight = Dimensions.get('screen').height;

// const btnGroupStyle = {
// 	marginBottom: -10,
// 	height: 40,
// 	borderRadius: 12,
// };

// const styles = StyleSheet.create({
// 	formContainer: {
// 		backgroundColor: 'white',
// 		borderRadius: 20,
// 	},
// 	headingStyle: {
// 		marginLeft: 10,
// 		marginTop: 5,
// 	},
// 	container: {
// 		height: '100%',
// 		marginTop: 10,
// 	},
// 	containerTop: {
// 		marginBottom: 10,
// 	},
// 	containerBottom: {
// 		marginBottom: 80,
// 		marginHorizontal: 10,
// 		flex: 1,
// 	},
// 	shortcutBannerStyle: {
// 		marginLeft: 10,
// 		fontSize: 18,
// 		color: 'gray',
// 		fontWeight: '600',
// 	},
// 	searchStyle: {
// 		marginTop: 10,
// 		borderWidth: 1,
// 		borderColor: 'gray',
// 		borderRadius: 20,
// 		paddingHorizontal: 15,
// 		paddingVertical: 10,
// 	},
// 	searchStyleCity: {
// 		marginTop: 10,
// 		borderWidth: 1,
// 		borderColor: 'gray',
// 		borderRadius: 20,
// 		paddingHorizontal: 15,
// 		paddingVertical: 10,
// 	},
// 	resultScreen: {
// 		backgroundColor: 'white',
// 		borderRadius: 20,
// 		marginBottom: windowHeight / 7,
// 	},
// 	flatList: {
// 		alignSelf: 'center',
// 	},
// 	errorMesg: {
// 		color: 'red',
// 		alignSelf: 'center',
// 		textAlign: 'center',
// 		marginTop: 5,
// 	},
// });
// export default RemdesivirScreen;
