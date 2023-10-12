import { View, Text, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { ScrollView } from 'react-native'
import { TextInput, ActivityIndicator } from 'react-native'
import OrdersCard from "../components/OrdersCard";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UseAuthContext } from '../context/AuthContext'

const Orders = () => {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(false)
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		axios(`https://instaport-api.vercel.app/order/customer/orders`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${await AsyncStorage.getItem("token")}`
			}
		})
			.then((res) => {
				setLoading(false)
				setRefreshing(false);
				setOrders(res?.data?.order)
			})
			.catch((err) => {
				setLoading(false)
				setRefreshing(false)
				console.warn(err)
			})
	}, []);
	const getOrders = async () => {
		setLoading(true)
		axios(`https://instaport-api.vercel.app/order/customer/orders`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${await AsyncStorage.getItem("token")}`
			}
		})
			.then((res) => {
				setLoading(false)
				setOrders(res?.data?.order)
			})
			.catch((err) => {
				setLoading(false)
				console.warn(err)
			})
	}
	useEffect(() => {
		getOrders()
	}, []);
	return (
		<Layout navbar={true} topbar={true} title={"Orders"}>
			<View className="h-full w-full flex items-center bg-white-200 mt-3">
				<View className="mt-2 w-full px-5">
					<TextInput selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg text-base px-5 py-2" onChangeText={(e) => { console.log(e) }} placeholder={"Search..."} keyboardType={"phone-pad"} />
				</View>
				{
					loading
						?
						<View className="h-[90%] w-full flex items-center justify-center flex-col">
							<ActivityIndicator size={"large"} color={"#FFCC00"} />
						</View>
						:
						<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className="w-full h-full" showsVerticalScrollIndicator={false}>
							{
								orders?.map((order, index) => {
									return <OrdersCard key={index} data={order} />
								})
							}
						</ScrollView>
				}
			</View>
		</Layout>
	)
}

export default Orders