import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { CheckBox, Text } from 'react-native-elements';

const MultiBloodGroupChecker = ({ takeBloodGroupValues }) => {
	// states
	const [ap, sap] = useState(false);
	const [an, san] = useState(false);
	const [bp, sbp] = useState(false);
	const [bn, sbn] = useState(false);
	const [op, sop] = useState(false);
	const [on, son] = useState(false);
	const [abp, sabp] = useState(false);
	const [abn, sabn] = useState(false);

	useEffect(() => {
		takeBloodGroupValues(createBloddGroupArray());
	}, [[ap, an, bp, bn, op, on, abp, abn]]);

	const createBloddGroupArray = () => {
		const selectedBloodGroups = [];
		ap ? (selectedBloodGroups[0] = 'A+') : (selectedBloodGroups[0] = 'none');
		an ? (selectedBloodGroups[1] = 'A-') : (selectedBloodGroups[1] = 'none');
		bp ? (selectedBloodGroups[2] = 'B+') : (selectedBloodGroups[2] = 'none');
		bn ? (selectedBloodGroups[3] = 'B-') : (selectedBloodGroups[3] = 'none');
		op ? (selectedBloodGroups[4] = 'O+') : (selectedBloodGroups[4] = 'none');
		on ? (selectedBloodGroups[5] = 'O-') : (selectedBloodGroups[5] = 'none');
		abp ? (selectedBloodGroups[6] = 'AB+') : (selectedBloodGroups[6] = 'none');
		abn ? (selectedBloodGroups[7] = 'AB-') : (selectedBloodGroups[7] = 'none');

		return selectedBloodGroups;
	};

	return (
		<View style={styles.btnContainer}>
			<Text style={styles.btnGrpBannerStyle}>
				Available plasama blood groups
			</Text>
			<View style={styles.btnContainerTop}>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="A+"
					size={20}
					checkedColor="#2089dc"
					checked={ap}
					onPress={() => sap(!ap)}
				/>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="A-"
					size={20}
					checkedColor="#2089dc"
					checked={an}
					onPress={() => san(!an)}
				/>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="B+"
					size={20}
					checkedColor="#2089dc"
					checked={bp}
					onPress={() => sbp(!bp)}
				/>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="B-"
					size={20}
					checkedColor="#2089dc"
					checked={bn}
					onPress={() => sbn(!bn)}
				/>
			</View>
			<View style={styles.btnContainerBottom}>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="O+"
					size={20}
					checkedColor="#2089dc"
					checked={op}
					onPress={() => sop(!op)}
				/>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="O-"
					size={20}
					checkedColor="#2089dc"
					checked={on}
					onPress={() => son(!on)}
				/>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="AB+"
					size={20}
					checkedColor="#2089dc"
					checked={abp}
					onPress={() => sabp(!abp)}
				/>
				<CheckBox
					textStyle={{ paddingRight: 0, paddingLeft: 0 }}
					containerStyle={{
						paddingHorizontal: 5,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderRadius: 10,
					}}
					style={styles.checkBoxStyle}
					title="AB-"
					size={20}
					checkedColor="#2089dc"
					checked={abn}
					onPress={() => sabn(!abn)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	btnContainer: {},
	checkBoxStyle: {},
	btnContainerTop: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	btnContainerBottom: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginHorizontal: 5,
	},
	btnGrpBannerStyle: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#87929d',
		marginLeft: 10,
		marginBottom: 10,
	},
});

export default MultiBloodGroupChecker;
