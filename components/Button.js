import React from 'react';
import { Text } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { View, StyleSheet } from 'react-native';

const Button = ({ title, disabled = true }) => {
	return (
		<TouchableHighlight style={{
			shadowColor: 'rgba(0,0,0, .8)', // IOS
			shadowOffset: { height: 5, width: 1 }, // IOS
			shadowOpacity: 1, // IOS
			shadowRadius: 1, //IOS
			elevation: 4, // Android
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
		}} className="flex justify-center rounded-full text-center px-4 py-4 bg-yellow-400" disabled={disabled}>
			<Text className="text-center font-bold text-white">{title}</Text>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({})

export default Button;
