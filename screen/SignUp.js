import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Layout from '../components/Layout';
import axios from 'axios';
import { UseAppContext } from '../context/AppContext';
import { ActivityIndicator } from 'react-native';

const SignUp = () => {
	const [type, setType] = useState("individual");
	const [fullname, setFullName] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();
	const { baseURL } = UseAppContext()
	const [loading, setLoading] = useState(false)

	const handleSignUp = () => {
		if (fullname && phoneNo && password) {
			setLoading(true)
			axios(`https://instaport-api.vercel.app/user/signup`, {
				method: "POST",
				data: {
					"fullname": fullname,
					"mobileno": phoneNo,
					"password": password,
					"usecase": type,
				}
			})
				.then((res) => {
					setLoading(false)
					navigation.navigate("SignIn")
				})
				.catch((err) => {
					setLoading(false)
				})
		}
	}
	return (
		<SafeAreaView>
			<Layout>
				{/* <StatusBar/> */}
				<ScrollView className="text-base px-5 py-12 bg-white min-h-screen">
					<KeyboardAvoidingView behavior='padding'>
						<Text className="text-4xl font-bold">Create Account</Text>
						<View className="overflow-hidden border  rounded-xl flex flex-row bg-red-300 w-full mx-auto mt-8">
							<TouchableHighlight onPress={() => {
								setType("individual")
							}} activeOpacity={1} underlayColor={"white"} className={type === "individual" ? "duration-150 px-3 py-3 bg-yellow-400 w-1/2 border-r" : "duration-150 px-3 py-3 bg-white w-1/2 border-r"}>
								<Text className="text-center">For Individuals</Text>
							</TouchableHighlight>
							<TouchableHighlight activeOpacity={1} underlayColor={"white"} onPress={() => {
								setType("business")
							}} className={type === "business" ? "duration-150 px-3 py-3 bg-yellow-400 w-1/2" : "duration-150 px-3 py-3 bg-white w-1/2"}>
								<Text className="text-center">For Business</Text>
							</TouchableHighlight>
						</View>


						<View className="flex flex-col mt-8">
							<View className={"mt-4 "}>
								<Text className="font-bold mb-1">{"Full name"}:</Text>
								<TextInput selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" onChangeText={(e) => { setFullName(e) }} value={fullname} placeholder={"eg. John Doe"} keyboardType={"default"} />
							</View>
							<View className={"mt-4 "}>
								<Text className="font-bold mb-1">{"Phone Number"}:</Text>
								<TextInput selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" onChangeText={(e) => { setPhoneNo(e) }} value={phoneNo} placeholder={"eg. 1234567890"} keyboardType={"phone-pad"} />
							</View>
							<View className={"mt-4 "}>
								<Text className="font-bold mb-1">{"Password"}:</Text>
								<TextInput selectionColor={"#FEF9C3"} secureTextEntry={true} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" onChangeText={(e) => { setPassword(e) }} value={password} placeholder={"**********"} keyboardType={"default"} />
							</View>
							<TouchableHighlight
								activeOpacity={1} underlayColor={"#facc15"}
								onPress={() => {
									// navigation.navigate("Send")
									handleSignUp()
								}} style={{
									shadowColor: 'rgba(0,0,0, .8)', // IOS
									shadowOffset: { height: 5, width: 1 }, // IOS
									shadowOpacity: 1, // IOS
									shadowRadius: 1, //IOS
									elevation: 4, // Android
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'row',
								}} className="mt-6 flex justify-center rounded-lg text-center px-4 py-4 bg-yellow-400" disabled={false}>
									{loading ? <ActivityIndicator color={"#ffffff"} size={"small"} /> : <Text className="text-center font-bold text-white">{"Create Account"}</Text>}
							</TouchableHighlight>
							<View className="mt-4 flex flex-row justify-center">
								<Text className="text-base text-center w-max">Already have an account?</Text>
								<TouchableHighlight activeOpacity={1} underlayColor={"white"} onPress={() => {
									navigation.navigate("SignIn")
								}}><Text className="text-base text-center w-max ml-1 text-yellow-400 underline">SignIn</Text></TouchableHighlight>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</Layout>
		</SafeAreaView >
	);
}

export default SignUp;
