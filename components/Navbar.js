import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Text } from 'react-native';
import { Keyboard, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { UseAuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Navbar = () => {
	const [keyboardStatus, setKeyboardStatus] = useState();
	const navigation = useNavigation()
	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardStatus(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardStatus(false);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);
	return (
		<View className="bg-white flex flex-row px-5 items-center justify-between w-screen shadow-xl border-t border-gray-400/20 fixed bottom-0 h-[9vh]">
			<Icon onPress={() => {
				navigation.navigate("Send")
			}} type='antdesign' name='home' size={29} />
			<Icon type='antdesign' name='plus' size={29} />
			<View className="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-400">
				<Icon onPress={() => { navigation.navigate("Orders") }} type='feather' name='box' size={29} />
			</View>
			<Icon type='antdesign' name='message1' size={29} />
			<Icon type='antdesign' name='user' onPress={() => {
				AsyncStorage.removeItem("token", () => {
					console.log("removed")
				})
				navigation.navigate("SignIn")
			}} size={29} />
		</View>
	);
}


export default Navbar;
