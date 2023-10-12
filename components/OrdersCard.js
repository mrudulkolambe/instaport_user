import { View, Text } from 'react-native'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const OrdersCard = ({ data }) => {
	const navigation = useNavigation();
	return (
		<TouchableHighlight style={{
			shadowColor: 'rgba(0,0,0, .8)',
			shadowOffset: { height: 5, width: 0 },
			shadowOpacity: 1,
			shadowRadius: 1,
			elevation: 5,
			alignItems: 'center',
			flexDirection: 'row',
		}}
			activeOpacity={1} underlayColor={"white"}
			onPress={() => {
				console.warn("test")
				navigation.navigate("TrackOrder", {
					_id: data?._id
				})
			}}
			className="m-auto w-[90%] p-3 rounded-xl bg-white mt-3"
		>
			<View className="items-center justify-between flex flex-row w-full">
				<View className="flex flex-row items-center">
					<View className="h-14 w-14 bg-yellow-400/[0.15] rounded-lg flex items-center justify-center">
						<Icon type='feather' name='shopping-bag' color={"#facc15"} size={25} />
					</View>
					<View className="ml-3">
						<Text className="text-base font-bold">#{data?._id?.slice(15)}</Text>
						<Text className="text-[13px]">On the way in delivery</Text>
					</View>
				</View>
				<View className="bg-yellow-400 px-3 flex flex-row items-center h-6 rounded-lg">
					<Text className="text-white text-xs font-bold">{data?.status}</Text>
				</View>
			</View>
		</TouchableHighlight>
	)
}

export default OrdersCard