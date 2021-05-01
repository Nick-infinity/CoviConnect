import React, { useContext, useState, useEffect, useFocusEffect } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Overlay, ButtonGroup } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context as userPostsContext } from '../context/PlasmaDonorContext';

import ShortcutBar from '../components/ShortcutBar';
import { FlatList } from 'react-native';
import PlasmaCard from '../components/dashboardCards/PlasmaCard';
import OxygenCard from '../components/dashboardCards/OxygenCard';
import MultiBloodGroupChecker from '../components/MultiBloodGroupChecker';
import Spacer from '../components/Spacer';

const DonorDashBoardScreen = ({ navigation }) => {
	const [screenState, setScreenState] = useState(0);
	const [visible, setVisible] = useState(false);
	const [editItem, setEditItem] = useState({});
	const [availability, SetAvailability] = useState(0);
	const availabilityOptions = ['Available', 'Unavailable'];
	const [valid, SetValid] = useState(-1);
	let bloodGroups = [];
	const {
		getUserPosts,
		state,
		userResponseMesg,
		updatePost,
		updateResponseMesg,
	} = useContext(userPostsContext);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getUserPosts();
		});
		return unsubscribe;
	}, []);

	const editPost = ({ item }) => {
		setEditItem(item);
		SetAvailability(editItem.availability);
		toggleOverlay();
	};

	const toggleOverlay = () => {
		setVisible(!visible);
	};

	const takeBloodGroupValues = (selectedBloodGroups) => {
		bloodGroups = selectedBloodGroups.filter((bg) => bg !== 'none');

		//console.log(bloodGroups);
		//console.log(bloodGroups);
	};

	//check validity of data on submit
	const isSubmissionValid = () => {
		if (availability === 1) {
			return true;
		} else if (availability === 0 && bloodGroups.length === 0) {
			return false;
		}
		return true;
	};

	// onClick for save button for update req
	const onSaveClick = async (_id, type, availability, bloodGroups) => {
		const res = isSubmissionValid();
		if (res) {
			SetValid(1);
			const res = await updatePost(_id, type, availability, bloodGroups);
			if (res) {
				toggleOverlay();
				getUserPosts();
				console.log('Submitted');
			} else if (res === false) {
			}
		} else {
			SetValid(0);
			console.log('Failed to update');
		}
	};
	return (
		<SafeAreaView forceInset={{ top: 'always' }}>
			<View style={styles.container}>
				<View style={styles.containerTop}>
					<Text h1 style={styles.headingStyle}>
						DASHBOARD
					</Text>
					<Text style={styles.shortcutBannerStyle}>Manage donor posts</Text>
					<ShortcutBar
						title1="Plasma Posts"
						title2="Oxygen Posts"
						iconName1="tint"
						iconName2="lungs"
						onClick1={() => {
							setScreenState(0);
						}}
						onClick2={() => {
							setScreenState(1);
						}}
					/>
				</View>

				<View style={styles.containerBottom}>
					<View style={styles.resultScreen}>
						<Overlay
							isVisible={visible}
							onBackdropPress={toggleOverlay}
							overlayStyle={{ borderRadius: 20 }}
						>
							<View style={styles.overlayContainer}>
								<View
									style={{
										borderRadius: 20,
										borderWidth: 1,
										borderColor: 'gray',
										padding: 10,
										alignSelf: 'center',
										marginBottom: 10,
									}}
								>
									<Text
										h4
										style={{ textAlign: 'center', paddingHorizontal: 1 }}
									>
										Manage content of your post
									</Text>
								</View>

								<View
									style={{
										borderRadius: 20,
										borderWidth: 1,
										borderColor: 'gray',
										padding: 10,
										alignSelf: 'center',
										marginBottom: 10,
									}}
								>
									<Text style={styles.overlayNameText}>{editItem.name}</Text>
									<Text style={styles.overlayFiedsText}>
										Area: {editItem.area}
									</Text>
									<Text style={styles.overlayFiedsText}>
										Contact: {editItem.contact}
									</Text>
									{editItem.type === 'pOrganization' ? (
										<Text style={styles.overlayFiedsText}>
											Secondary Contact: {editItem.contact2}
										</Text>
									) : null}

									<MultiBloodGroupChecker
										takeBloodGroupValues={takeBloodGroupValues}
									/>
									<Text></Text>
									<Text style={styles.btnGrpBannerStyle}>
										Plasma availability
									</Text>
									<ButtonGroup
										onPress={(num) => {
											SetAvailability(num);
										}}
										selectedIndex={availability}
										buttons={availabilityOptions}
										containerStyle={btnGroupStyle}
									/>
									{valid === 0 ? (
										<Text style={styles.errorMesg}>
											Chose Blood Groups Or Mark Unavailable
										</Text>
									) : null}
									<Text style={styles.errorMesg}>{updateResponseMesg}</Text>

									<TouchableOpacity
										style={styles.btnStyle}
										onPress={() => {
											onSaveClick(
												editItem._id,
												editItem.type,
												availability,
												bloodGroups
											);
										}}
									>
										<View style={styles.btnContainer}>
											<Text h4 style={styles.btnTextStyle}>
												Update
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</Overlay>
						{userResponseMesg === 'Something went wrong. Please try again' ||
						userResponseMesg === 'You havent made any donations posts yet.' ? (
							<>
								<Spacer />
							</>
						) : null}
						<Text style={styles.errorMesg}>{state.userResponseMesg}</Text>

						{screenState === 0 ? (
							<FlatList
								showsVerticalScrollIndicator={false}
								data={state.userPosts[0]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <PlasmaCard item={item} callback={editPost} />;
								}}
							/>
						) : null}
						{screenState === 1 ? (
							<FlatList
								data={state.userPosts[1]}
								keyExtractor={(item) => item._id}
								renderItem={({ item }) => {
									return <OxygenCard item={item} />;
								}}
							/>
						) : null}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const btnGroupStyle = {
	marginBottom: 20,
	height: 40,
	borderRadius: 12,
};

const styles = StyleSheet.create({
	errorMesg: {
		color: 'red',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 5,
	},
	shortcutBannerStyle: {
		marginLeft: 10,
		fontSize: 18,
		color: 'gray',
		fontWeight: '600',
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
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: 20,
		marginBottom: windowHeight / 22,
	},
	overlayContainer: {
		borderRadius: 20,
		height: windowHeight / 1.3,
		width: windowWidth / 1.2,
	},
	overlayFiedsText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: 10,
		marginBottom: 10,
	},
	overlayNameText: {
		fontSize: 25,
		fontWeight: 'bold',
		alignSelf: 'center',
		textAlign: 'center',
		marginHorizontal: 10,
		marginBottom: 10,
	},
	btnGrpBannerStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: 10,
		marginBottom: 10,
	},
	btnStyle: {
		borderRadius: 20,
	},
	btnContainer: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: 'gray',
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginHorizontal: 40,
		alignItems: 'center',
		marginTop: 10,
		backgroundColor: '#272727',
	},
	btnTextStyle: {
		color: 'white',
	},
});
export default DonorDashBoardScreen;
