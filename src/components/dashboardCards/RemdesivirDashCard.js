import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet, Linking, Platform } from 'react-native';
import { Context as DeleteContext } from '../../context/PlasmaDonorContext';

import { Input, Text, Button, Icon, SearchBar } from 'react-native-elements';

const RemdesivirDashCard = ({ item }) => {
	const { deletePost, getUserPosts } = useContext(DeleteContext);
	// destructure the item object
	const { name, updatedAt, availability, location, _id, type } = item;

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
						<Text
							style={
								([styles.textStyle],
								[{ color: 'gray', fontWeight: '700', fontSize: 18 }])
							}
						>
							{name.toUpperCase()}
						</Text>
						<Text>{location}</Text>

						<Text style={styles.statusStyle}>
							Remdesivir: {getAvailability()}
						</Text>
						<Text>Posted on: {reverseString(updatedAt)}</Text>
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
		width: Dimensions.get('screen').width / 2.5,
	},

	container: {
		borderRadius: 10,
		borderWidth: 2,
		marginHorizontal: 10,
		marginBottom: 10,
		borderColor: 'gray',
		paddingHorizontal: 5,
		paddingVertical: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	locationcontainer: {
		flexDirection: 'row',
	},
	textStyle: {
		color: 'black',
	},
	btnStyle: {
		borderRadius: 7,
		paddingHorizontal: 3,
		borderWidth: 1,
		borderColor: 'gray',
		marginTop: 5,
		alignItems: 'center',
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	deletebtnTextStyle: {
		fontWeight: '700',
		fontSize: 24,
		color: '#ff9994',
	},
	editbtnTextStyle: {
		fontWeight: '700',
		fontSize: 24,
	},
	changebtnTextStyle: {
		fontWeight: '700',
		fontSize: 18,
	},
	statusStyle: {
		fontWeight: '700',
	},
});

export default RemdesivirDashCard;
