import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, SafeAreaView, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const SplashScreen = () => {
	const navigation = useNavigation()
	return (
		<SafeAreaView className="bg-white h-screen w-screen">
			{/* <StatusBar /> */}
			<View className="h-[60%] w-screen flex items-center justify-center">
				<Image source={require('../assets/splash-img.png')} className="h-58 w-58" />
			</View>
			<View className="px-5 py-8 flex flex-col items-center rounded-3xl h-[40%] w-screen bg-gray-100">
				<Text className="text-3xl font-bold">Welcome</Text>
				<Text className="text-3xl font-bold">To InstaPort</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("SignIn")
					}}>
					<Icon
						className="mt-5 h-12 w-12 flex items-center justify-center bg-yellow-400 rounded-full"
						type='evil-icons'
						size={40}
						color="white"
						name="chevron-right"
					/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

export default SplashScreen;
