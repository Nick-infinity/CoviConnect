import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { Context as DeleteContext } from '../../context/PlasmaDonorContext';
import { FirstLetterUpperCase } from '../../components/FirstLetterUpperCase';

// adpat to screeen size
import { Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Text } from 'react-native-elements';

const PlasmaCardIndividaul = ({ item }) => {
	const { deletePost, getUserPosts } = useContext(DeleteContext);
	// destructure the item object
	const {
		name,
		updatedAt,
		availability,
		bloodGroup,
		type,
		area,
		city,
		_id,
	} = item;

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
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<Text style={styles.textStyle}>{name.toUpperCase()}</Text>
					<Text style={styles.regularText}>{area}</Text>
					<Text style={styles.regularText}>{FirstLetterUpperCase(city)}</Text>

					<Text style={styles.regularText}>Plasma for: {bloodGroup}</Text>

					<Text style={styles.statusStyle}>Plasma: {getAvailability()}</Text>
					<Text>Posted on: {reverseString(updatedAt)}</Text>
				</View>
				<View style={styles.rightContainer}>
					<TouchableOpacity onPress={() => deleteUserPosts(-2)}>
						<View style={styles.btnStyle}>
							<Text style={styles.donatedbtnTextStyle}>Donated</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => deleteUserPosts(-1)}>
						<View style={styles.btnStyle}>
							<Text style={styles.deletebtnTextStyle}>Delete</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	rightContainer: {
		justifyContent: 'space-evenly',
	},
	leftContainer: {
		width: windowWidth / 2.5,
		flex: 1,
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
	regularText: {
		fontSize: RFPercentage(1.8),
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
	editbtnTextStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(3),
	},
	donatedbtnTextStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(3),
	},
	statusStyle: {
		fontWeight: '700',
		fontSize: RFPercentage(1.8),
	},
});

export default PlasmaCardIndividaul;
