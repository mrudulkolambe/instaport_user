import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Layout from '../components/Layout';
import { TextInput } from 'react-native';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseOrderContext } from '../context/OrderContext';

const OrderDetails = () => {
	const [loading, setLoading] = useState(false);
	const { orderState, handleChange } = UseOrderContext()
	const navigation = useNavigation()
	return (
		<>
			<Layout title={"New Order"} topbar={true} navbar={true}>
				<KeyboardAvoidingView className="bg-white w-full h-full">
					<ScrollView className="h-full">
						<View className="bg-white h-full w-full flex items-center bg-white-200 px-5 py-3">
							<View className={"w-full"}>
								<Text className="font-bold mb-1">{"Package"}:</Text>
								<TextInput value={orderState?.package} selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" onChangeText={(e) => { handleInputChange("package", e) }} placeholder={"What are you sending?"} keyboardType={"default"} />
							</View>
							<ScrollView endFillColor={"#000"} horizontal={true} showsHorizontalScrollIndicator={false} className="mt-4 flex-none"
								bounces={true} alwaysBounceHorizontal={true}>
								<TouchableOpacity onPress={() => {
									handleChange("package", "Clothes")
								}} className="flex items-center justify-center h-9 border-[1.5px] border-yellow-400 p-1 rounded-full px-5 mr-3">
									<Text className="text-sm">Clothes</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {
									handleChange("package", "Documents")
								}} className="flex items-center justify-center h-9 border-[1.5px] border-yellow-400 p-1 rounded-full px-5 mr-3">
									<Text className="text-sm">Documents</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {
									handleChange("package", "Food")
								}} className="flex items-center justify-center h-9 border-[1.5px] border-yellow-400 p-1 rounded-full px-5 mr-3">
									<Text className="text-sm">Food</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {
									handleChange("package", "Flowers")
								}} className="flex items-center justify-center h-9 border-[1.5px] border-yellow-400 p-1 rounded-full px-5 mr-3">
									<Text className="text-sm">Flowers</Text>
								</TouchableOpacity>
							</ScrollView>
							<View className={"w-full mt-4"}>
								<Text className="font-bold mb-1">{"Parcel Value"}:</Text>
								<TextInput onChangeText={(e) => { handleChange("parcel_value", e) }} value={orderState?.parcel_value} selectionColor={"#FEF9C3"} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" placeholder={"Enter your parcel value"} keyboardType={"numeric"} />
							</View>
							<Text className="text-xs mt-2 text-gray-400">
								Safeguard your valuable items so that you may recover the value in the event of loss or damage during delivery. For this service, we charge a fee of 0.85%+GST of the value you declared above (added to the shipping cost). Up to 50,000 allowed
							</Text>
							<View className={"w-full mt-3"}>
								<Text className="font-bold mb-1">{"Your phone number"}:</Text>
								<TextInput onChangeText={(e) => { handleChange("phone_number", e) }} value={orderState?.phone_number} selectionColor={"#FEF9C3"} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" placeholder={"Enter Phone Number"} keyboardType={"phone-pad"} />
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
								navigation.navigate("ShippingDetails")
							}} >
								{loading ? <ActivityIndicator color={"#ffffff"} size={"small"} /> : <Text className="text-center font-bold text-white">{"Continue"}</Text>}
							</TouchableHighlight>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</Layout >
		</>
	);
}

const styles = StyleSheet.create({})

export default OrderDetails;
