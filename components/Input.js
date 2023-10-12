import React from 'react';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Text } from 'react-native';
import { View, StyleSheet } from 'react-native';

const Input = ({ label, onChange, placeholder, keyboardType, secureTextEntry=false, className }) => {
	const [value, setValue] = useState("");
	return (
		<View className={"text-lg " + className}>
			{label && <Text className="font-bold mb-1">{label}:</Text>}
			<TextInput selectionColor={"#FEF9C3"} secureTextEntry={secureTextEntry} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" onChangeText={(e) => { setValue(e) }} value={value} placeholder={placeholder} keyboardType={keyboardType} />
		</View>
	);
}

const styles = StyleSheet.create({})

export default Input;
