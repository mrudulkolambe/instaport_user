import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const Topbar = ({ title }) => {
	const navigation = useNavigation()
	return (
		<>
			<View className="bg-white flex items-center justify-start px-7  gap-x-3 flex-row h-[7vh] border-b border-gray-400/20">
				<Icon type='antdesign' name="arrowleft" onPress={() => {
					navigation.goBack()
				}} />
				<Text className="text-lg font-bold">{title}</Text>
			</View>
		</>
	)
}

export default Topbar