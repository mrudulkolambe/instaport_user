import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native'
import Topbar from './Topbar'
import { SafeAreaView } from 'react-native'
import Navbar from './Navbar'

const Layout = ({ children, topbar, navbar, title }) => {
	return (
		<SafeAreaView>
			<StatusBar style='light' backgroundColor={"#000"} animated={true} />
			{topbar && <Topbar title={title} />}
			{topbar && !navbar && <View className={"bg-white h-[93vh] max-h-[93vh] flex items-center justify-center"}>
				{children}
			</View>}
			{navbar && !topbar && <View className={" bg-white h-[91vh] max-h-[91vh] flex items-center justify-center"}>
				{children}
			</View>}
			{navbar && topbar && <View className={"bg-white h-[84vh] max-h-[84vh] flex items-center justify-center"}>
				{children}
			</View>}
			{
				!navbar && !topbar && <View className={"bg-white h-[100vh] max-h-[100vh] flex items-center justify-center"}>
					{children}
				</View>
			}
			{navbar && <Navbar />}
		</SafeAreaView>
	)
}

export default Layout