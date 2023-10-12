import { View, Text } from 'react-native'
import SplashScreen from '../screen/SplashScreen'
import HomeScreen from '../screen/HomeScreen';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import Send from '../screen/Send';
import CreateOrder from '../screen/CreateOrder';
import OrderDetails from '../screen/OrderDetails';
import ShippingDetails from '../screen/ShippingDetails';
import TrackOrder from '../screen/TrackOrder';
import Orders from '../screen/Orders';
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

const Router = () => {
	const Stack = createStackNavigator();
	return (
		<Stack.Navigator initialRouteName='SignUp'>
			<Stack.Screen name='SplashScreen' component={SplashScreen} options={{
				headerShown: false
			}} />
			<Stack.Screen name='SignUp' component={SignUp} options={{
				headerShown: false
			}} />
			<Stack.Screen name='SignIn' component={SignIn} options={{
				headerShown: false
			}} />
			<Stack.Screen name='HomeScreen' component={HomeScreen} options={{
				headerShown: false
			}} />
			<Stack.Screen name='Send' component={Send} options={{
				headerShown: false
			}} />
			<Stack.Screen name='CreateOrder' component={CreateOrder} options={{
				headerShown: false,
			}} />
			<Stack.Screen name='OrderDetails' component={OrderDetails} options={{
				headerShown: false,
			}} />
			<Stack.Screen name='ShippingDetails' component={ShippingDetails} options={{
				headerShown: false,
			}} />
			<Stack.Screen name='TrackOrder' component={TrackOrder} options={{
				headerShown: false,
			}} />
			<Stack.Screen name='Orders' component={Orders} options={{
				headerShown: false,
			}} />
		</Stack.Navigator>
	)
}

export default Router