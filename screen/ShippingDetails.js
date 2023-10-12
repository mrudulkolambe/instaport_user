import { View, Text, StatusBar, ActivityIndicator, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import { TouchableHighlight, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UseOrderContext } from '../context/OrderContext'
import axios from 'axios'
import { UseAuthContext } from '../context/AuthContext'
import { UseAppContext } from '../context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ShippingDetails = () => {
	const [loading, setLoading] = useState(false)
	const { baseURL } = UseAppContext()
	const { orderState, handleChange, pickup, drop } = UseOrderContext()
	const { getUser, socket } = UseAuthContext()
	const navigation = useNavigation()

	const handleSubmit = async () => {
		// const user = await getUser()
		const user = await AsyncStorage.getItem("user")
		if (user) {
			setLoading(true)
			axios(`https://instaport-api.vercel.app/order/create`, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${await AsyncStorage.getItem("token")}`
				},
				data: { ...orderState, pickup, drop: [drop], customer: user._id }
			})
				.then((res) => {
					setLoading(false)
					navigation.navigate("Orders")
					// socket.emit("order", res.data.order)
					// console.warn(res.data)
				})
				.catch((err) => {
					setLoading(false)
					console.warn(err)
				})
		}
	}

	return (
		<>
			<Layout navbar={true} topbar={true} title={"Shipping Details"}>
				<View className="bg-white h-full w-full flex items-center bg-white-200 px-3 py-3">
					<View className={"w-full mt-3"}>
						<Text className="font-bold mb-1 text-lg">{"Select Shipping"}:</Text>
						<TouchableOpacity onPress={() => {
							handleChange("vehicle", "bike")
						}} activeOpacity={0.8} className={orderState?.vehicle !== "bike" ? "border-2 border-transparent p-3 shadow-lg bg-white rounded-xl flex flex-row" : "border-2 border-yellow-400 p-3 shadow-lg bg-white rounded-xl flex flex-row"}
							style={{
								elevation: 10,
								shadowOffset: {
									width: 0,
									height: 0
								},
								shadowOpacity: 0.1,
								shadowRadius: 0,
								shadowColor: "#000"
							}}>
							<View className="w-12 flex items-center justify-center h-12 bg-[#FFFAD3] p-2 rounded-lg">
								<Image source={require("../assets/bike.png")} />
							</View>
							<View className="ml-3">
								<Text className="font-bold text-base">Bike</Text>
								<Text>For low capacity delivery</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							handleChange("vehicle", "scooty")
						}} activeOpacity={0.8} className={orderState?.vehicle !== "scooty" ? "mt-3 border-2 border-transparent p-3 shadow-lg bg-white rounded-xl flex flex-row" : "mt-3 border-2 border-yellow-400 p-3 shadow-lg bg-white rounded-xl flex flex-row"}
							style={{
								elevation: 10,
								shadowOffset: {
									width: 0,
									height: 0
								},
								shadowOpacity: 0.1,
								shadowRadius: 0,
								shadowColor: "#000"
							}}>
							<View className="w-12 flex items-center justify-center h-12 bg-[#FFFAD3] p-2 rounded-lg">
								<Image source={require("../assets/bike.png")} />
							</View>
							<View className="ml-3">
								<Text className="font-bold text-base">Scooty</Text>
								<Text>For high capacity delivery</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View className="flex mt-3 w-full">
						<View className="flex w-full items-start">
							<Text className="font-bold mb-1 text-lg">{"Collect Payment At"}:</Text>
						</View>
						<TouchableOpacity onPress={() => {
							handleChange("payment_address", { ...pickup })
						}} className="p-3 shadow-lg bg-white rounded-xl flex flex-row"
							style={{
								elevation: 10,
								shadowOffset: {
									width: 0,
									height: 0
								},
								shadowOpacity: 0.1,
								shadowRadius: 0,
								shadowColor: "#000"
							}}>
							<View className="w-12 flex items-center justify-center h-12 bg-[#FFFAD3] p-2 rounded-lg">
								<Text className="font-bold text-lg">1</Text>
							</View>
							<View className="ml-3">
								<Text className="font-bold text-base">Address - 1</Text>
								<Text>{pickup?.address?.text?.slice(0, 30)}...</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {
							handleChange("payment_address", { ...drop })
						}} className="mt-3 p-3 shadow-lg bg-white rounded-xl flex flex-row"
							style={{
								elevation: 10,
								shadowOffset: {
									width: 0,
									height: 0
								},
								shadowOpacity: 0.1,
								shadowRadius: 0,
								shadowColor: "#000"
							}}>
							<View className="w-12 flex items-center justify-center h-12 bg-[#FFFAD3] p-2 rounded-lg">
								<Text className="font-bold text-lg">2</Text>
							</View>
							<View className="ml-3">
								<Text className="font-bold text-base">Address - 2</Text>
								<Text>{drop?.address?.text?.slice(0, 30)}...</Text>
							</View>
						</TouchableOpacity>
					</View>
					<TouchableHighlight style={{
						shadowColor: 'rgba(0,0,0, .8)', // IOS
						shadowOffset: { height: 5, width: 1 }, // IOS
						shadowOpacity: 1, // IOS
						shadowRadius: 1, //IOS
						elevation: 4, // Android
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'row',
					}} className="min-w-[50%] mt-6 flex justify-center rounded-full text-center px-4 py-4 bg-yellow-400" onPress={() => {
						handleSubmit()
					}} >
						{loading ? <ActivityIndicator color={"#ffffff"} size={"small"} /> : <Text className="text-center font-bold text-white">{"Place Order"}</Text>}
					</TouchableHighlight>
				</View>
			</Layout>
		</>
	)
}

export default ShippingDetails