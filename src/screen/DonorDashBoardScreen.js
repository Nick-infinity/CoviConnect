import React, { useContext, useState, useEffect } from 'react';
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
import RemdesivirDashCard from '../components/dashboardCards/RemdesivirDashCard';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

	const EditOverlay = () => {
		return (
			<Overlay
				isVisible={visible}
				onBackdropPress={toggleOverlay}
				overlayStyle={{ borderRadius: windowWidth * 0.05 }}
			>
				<View style={styles.overlayContainer}>
					<View
						style={{
							borderRadius: windowWidth * 0.05,
							borderWidth: 1,
							borderColor: 'gray',
							padding: windowWidth * 0.02,
							alignSelf: 'center',
							marginBottom: windowHeight * 0.013,
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								paddingHorizontal: windowWidth * 0.01,
								fontSize: RFPercentage(2.5),
								fontWeight: 'bold',
							}}
						>
							Manage content of your post
						</Text>
					</View>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View
							style={{
								borderRadius: windowWidth * 0.05,
								borderWidth: 1,
								borderColor: 'gray',
								padding: windowWidth * 0.02,
								alignSelf: 'center',
								marginBottom: windowHeight * 0.013,
							}}
						>
							<Text style={styles.overlayNameText}>{editItem.name}</Text>
							<Text style={styles.overlayFiedsText}>Area: {editItem.area}</Text>
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
							<Text style={styles.btnGrpBannerStyle}>Plasma availability</Text>
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
									<Text style={styles.btnTextStyle}>Update</Text>
								</View>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</Overlay>
		);
	};
	return (
		<View style={styles.container}>
			<EditOverlay />
			<View style={styles.containerTop}>
				<Text style={styles.headingStyle}>DASHBOARD</Text>
				<Text style={styles.shortcutBannerStyle}>Manage donor posts</Text>
				<ShortcutBar
					btncount={3}
					title1="Plasma Posts"
					title2="Oxygen Posts"
					title3="Remde. Posts"
					iconSelector={screenState}
					iconName1="tint"
					iconName2="lungs"
					iconName3="syringe"
					onClick1={() => {
						setScreenState(0);
					}}
					onClick2={() => {
						setScreenState(1);
					}}
					onClick3={() => {
						setScreenState(2);
					}}
				/>
			</View>

			<View style={styles.containerBottom}>
				<View style={styles.resultScreen}>
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
					{screenState === 2 ? (
						<FlatList
							data={state.userPosts[2]}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => {
								return <RemdesivirDashCard item={item} />;
							}}
						/>
					) : null}
				</View>
			</View>
		</View>
	);
};

const btnGroupStyle = {
	marginBottom: -windowHeight * 0.013,
	height: windowHeight * 0.05,
	borderRadius: windowWidth * 0.03,
};

const styles = StyleSheet.create({
	errorMesg: {
		fontSize: RFPercentage(1.7),
		color: 'red',
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: windowHeight * 0.007,
	},
	shortcutBannerStyle: {
		marginLeft: windowWidth * 0.02,
		fontSize: RFPercentage(2.4),
		color: 'gray',
		fontWeight: '600',
	},
	headingStyle: {
		marginLeft: windowWidth * 0.02,
		marginTop: windowHeight * 0.013,
		fontWeight: 'bold',
		fontSize: RFPercentage(5),
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},
	containerTop: {
		justifyContent: 'flex-start',
		marginBottom: 10,
	},
	containerBottom: {
		marginHorizontal: windowWidth * 0.02,
		flex: 1,
		justifyContent: 'flex-start',
		marginTop: windowHeight * 0.001,
		marginBottom: windowHeight * 0.08,
	},
	resultScreen: {
		backgroundColor: 'white',
		borderRadius: windowWidth * 0.05,
		flex: 1,
	},
	overlayContainer: {
		borderRadius: windowWidth * 0.05,
		height: windowHeight / 1.4,
		width: windowWidth / 1.18,
	},
	overlayFiedsText: {
		fontSize: RFPercentage(2),
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: windowWidth * 0.02,
		marginBottom: windowHeight * 0.013,
	},
	overlayNameText: {
		fontSize: RFPercentage(4),
		fontWeight: 'bold',
		alignSelf: 'center',
		textAlign: 'center',
		marginLeft: windowWidth * 0.02,
		marginBottom: windowHeight * 0.013,
	},
	btnGrpBannerStyle: {
		fontSize: RFPercentage(2),
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: windowWidth * 0.02,
		marginBottom: windowHeight * 0.013,
	},
	btnStyle: {
		borderRadius: windowWidth * 0.05,
	},
	btnContainer: {
		borderWidth: 1,
		borderRadius: windowWidth * 0.05,
		borderColor: 'gray',
		paddingHorizontal: windowWidth * 0.04,
		paddingVertical: windowHeight * 0.013,
		marginHorizontal: windowWidth * 0.08,
		alignItems: 'center',
		marginTop: windowHeight * 0.013,
		backgroundColor: '#272727',
	},
	btnTextStyle: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: RFPercentage(3),
	},
});
export default DonorDashBoardScreen;
