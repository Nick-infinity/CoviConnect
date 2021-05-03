import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { Context as DeleteContext } from '../../context/PlasmaDonorContext';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Input, Text, Button, Icon, SearchBar } from 'react-native-elements';
import PlasmaIndividual from '../../screen/forms/PlasmaIndividual';

const OxygenCard = ({ item }) => {
	const { deletePost, getUserPosts } = useContext(DeleteContext);
	// destructure the item object
	const { name, updatedAt, availability, type, area, _id } = item;

	const getAvailability = () => {
		if (availability === 0) {
			return 'Available';
		}
		return 'Unavailable';
	};

	function reverseString(str) {
		str = str.substring(0, 10);
		let arr = str.split('-');
		str = arr[2] + '-' + arr[1] + '-' + arr[0];
		return str;
	}

	const deleteUserPosts = (availabilityType) => {
		deletePost(_id, type, availabilityType);
		getUserPosts();
	};

	return (
		<>
			{availability !== -1 ? (
				///////////////// for all///////////////////
				<View style={styles.container}>
					<View style={styles.leftContainer}>
						<Text style={styles.textStyle}>{name.toUpperCase()}</Text>
						<Text style={styles.regularText}>{area}</Text>

						<Text style={styles.statusStyle}>Oxygen: {getAvailability()}</Text>
						<Text style={styles.regularText}>
							Posted on: {reverseString(updatedAt)}
						</Text>
					</View>
					<View style={styles.rightContainer}>
						{availability === 0 ? (
							<TouchableOpacity onPress={() => deleteUserPosts(1)}>
								<View style={styles.btnStyle}>
									<Text style={styles.changebtnTextStyle}>Set Unavailable</Text>
								</View>
							</TouchableOpacity>
						) : null}
						{availability === 1 ? (
							<TouchableOpacity onPress={() => deleteUserPosts(0)}>
								<View style={styles.btnStyle}>
									<Text style={styles.changebtnTextStyle}>Set Available</Text>
								</View>
							</TouchableOpacity>
						) : null}

						<TouchableOpacity onPress={() => deleteUserPosts(-1)}>
							<View style={styles.btnStyle}>
								<Text style={styles.deletebtnTextStyle}>Delete</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			) : null}
		</>
	);
};

const styles = StyleSheet.create({
	rightContainer: {
		justifyContent: 'space-evenly',
	},
	leftContainer: {
		width: windowWidth / 2.5,
	},
	regularText: {
		fontSize: RFPercentage(1.8),
	},
	container: {
		borderRadius: windowWidth * 0.025,
		borderWidth: 2,
		marginHorizontal: windowWidth * 0.02,
		marginBottom: windowHeight * 0.013,
		borderColor: 'gray',
		paddingHorizontal: windowWidth * 0.01,
		paddingVertical: windowHeight * 0.004,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	locationcontainer: {
		flexDirection: 'row',
	},
	textStyle: {
		color: 'black',
		color: 'gray',
		fontWeight: '700',
		fontSize: RFPercentage(2.5),
	},
	btnStyle: {
		borderRadius: windowWidth * 0.025,
		paddingHorizontal: windowWidth * 0.01,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: windowHeight * 0.007,
		alignItems: 'center',
		paddingHorizontal: windowWidth * 0.01,
		paddingVertical: windowHeight * 0.003,
	},
	deletebtnTextStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(3),
		color: '#ff9994',
	},

	changebtnTextStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(2.5),
	},
	statusStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(1.8),
	},
});

export default OxygenCard;
