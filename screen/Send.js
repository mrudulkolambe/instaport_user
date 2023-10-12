import { View, Text } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Topbar from '../components/Topbar'
import { StatusBar } from 'react-native'
import Layout from '../components/Layout'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Send = () => {
	const [loading, setLoading] = useState(false)
	const navigation = useNavigation()
	return (
		<Layout topbar={false} navbar={true} >
			<View className="h-full w-full flex items-center justify-center bg-white">
				<Image className="w-[75%] aspect-square h-auto" source={require("../assets/send-package.png")} />
				<Text className="text-2xl font-bold">Send a Package</Text>
				<Text className="w-[72%] text-center mt-1">Pickup and delivery of documents, gifts, flowers, food, and more.</Text>
				<TouchableHighlight style={{
					shadowColor: 'rgba(0,0,0, .8)', // IOS
					shadowOffset: { height: 5, width: 1 }, // IOS
					shadowOpacity: 1, // IOS
					shadowRadius: 1, //IOS
					elevation: 4, // Android
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
				}} className="min-w-[70%] mt-6 flex justify-center rounded-full text-center px-4 py-4 bg-yellow-400" onPress={() => {
					navigation.navigate("CreateOrder")
				}} >
					{loading ? <ActivityIndicator color={"#ffffff"} size={"small"} /> : <Text className="text-center font-bold text-white">{"Create an Order"}</Text>}
				</TouchableHighlight>
				<TouchableHighlight style={{
					shadowColor: 'rgba(0,0,0, .8)', // IOS
					shadowOffset: { height: 5, width: 1 }, // IOS
					shadowOpacity: 1, // IOS
					shadowRadius: 1, //IOS
					elevation: 4, // Android
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
				}} className="min-w-[70%] mt-6 flex justify-center rounded-full text-center px-4 py-4 bg-yellow-400" onPress={() => {
					AsyncStorage.removeItem("token", () => {
						console.log("removed")
					})
					navigation.navigate("SignIn")
				}} >
					{loading ? <ActivityIndicator color={"#ffffff"} size={"small"} /> : <Text className="text-center font-bold text-white">{"Logout"}</Text>}
				</TouchableHighlight>
			</View>
		</Layout>
	)
}

export default Send