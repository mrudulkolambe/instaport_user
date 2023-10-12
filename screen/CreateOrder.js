import { View, Text, StatusBar, ActivityIndicator, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useCallback } from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import { TouchableHighlight } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native'
import BottomSheet, {
	BottomSheetView, BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { useRef } from 'react'
import { useMemo } from 'react'
import { Icon, Input } from 'react-native-elements'
import { Switch } from 'react-native'
import GooglePlacesInput from '../components/GooglePlacesInput'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet } from 'react-native';
import { Poppins_100Thin, Poppins_200ExtraLight, Poppins_400Regular, Poppins_300Light, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold, Poppins_900Black } from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font';
import { useEffect } from 'react'
import { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { UseAppContext } from '../context/AppContext'
import { Dimensions } from 'react-native'
import { Image, Animated } from 'react-native'
import Geocoder from 'react-native-geocoding'
import { UseOrderContext } from '../context/OrderContext'

const CreateOrder = () => {
	const { latLng } = UseAppContext()
	const { pickup, drop, handleInputChange, handleChange, orderState } = UseOrderContext()
	const [loading, setLoading] = useState(false)
	const [bottomSheetLoading, setBottomSheetLoading] = useState(false)
	const weightRef = useRef()
	const pickupPointRef = useRef()
	const dropPointRef = useRef()
	const _mapRef = useRef()
	const searchAddressRef = useRef()
	const navigation = useNavigation();
	const weightSnapPoints = useMemo(() => ["50%"], []);
	const addressSnapPoints = useMemo(() => ["50%", "70%"], []);
	const searchSnapPoints = useMemo(() => ["90%"], []);
	const [dropLocations, setDropLocations] = useState([])
	const GOOGLE_PLACES_API_KEY = 'AIzaSyCQb159dbqJypdIO1a1o0v_mNgM5eFqVAo';
	const [mapData, setMapData] = useState()
	const [address, setAddress] = useState()
	const [reverseLocation, setReverseLocation] = useState("");
	const [buyMe, setBuyMe] = useState(false)
	const [addressIndex, setAddressIndex] = useState(-1);
	const [currentIndex, setCurrentIndex] = useState(0)
	const handleClosePress = useCallback(() => {
		weightRef.current?.close();
	}, []);

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setBottomSheetLoading(false)
		}, 2000)
		return () => {
			clearTimeout(loadingTimeout)
		};
	}, [addressIndex]);

	const renderBackdrop = useCallback(
		props => (
			<BottomSheetBackdrop
				{...props}
				opacity={0.4}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);
	useEffect(() => {
		Geocoder.init("AIzaSyCQb159dbqJypdIO1a1o0v_mNgM5eFqVAo");
	}, []);

	const removeComponentAtIndex = (index) => {
		const newComponents = [...dropLocations];
		newComponents.splice(index, 1);
		setDropLocations(newComponents);
	};

	const handleAddressBottomSheet = (index) => {
		setCurrentIndex(index)
		searchAddressRef.current?.snapToIndex(0)
	}
	return (
		<>
			<Layout navbar={true} topbar={true} title={"Create Order"}>
				<ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} className="bg-white w-full">
					<View className="bg-white h-full w-full flex items-center bg-white-200 px-3 py-3">
						<View className="w-full flex flex-row gap-x-3">
							<TouchableHighlight activeOpacity={1} underlayColor={"white"} onPress={() => {
								handleChange("delivery_type", "now")
							}} className={orderState?.delivery_type === "now" ? "rounded-lg p-3 h-[75px] flex-1 bg-yellow-400 border-2 border-yellow-400" : "rounded-lg p-3 h-[75px] flex-1 border-2 border-yellow-400"}>
								<Text className="font-bold text-base">Deliver Now</Text>
							</TouchableHighlight>
							<TouchableHighlight activeOpacity={1} underlayColor={"white"} onPress={() => {
								handleChange("delivery_type", "schedule")
							}} className={orderState?.delivery_type === "schedule" ? "rounded-lg p-3 h-[75px] flex-1 bg-yellow-400 border-2 border-yellow-400" : "rounded-lg p-3 h-[75px] flex-1 border-2 border-yellow-400"}>
								<Text className="font-bold text-base">Schedule</Text>
							</TouchableHighlight>
						</View>
						<Text className="text-xs mt-2 text-gray-400">
							As soon as feasible, we will designate the closest courier to pick up and deliver.
						</Text>
						<View className="mt-3 w-full">
							<Text className="font-bold">{"Parcel Weight"}:</Text>
							<TouchableOpacity onPress={() => {
								weightRef.current?.snapToIndex(0);
							}} className="py-4 px-5 mt-1 w-full border-2 border-yellow-400 rounded-xl">
								<Text className="text-base">{orderState?.parcel_weight ? orderState?.parcel_weight : "Select weight of parcel"}</Text>
							</TouchableOpacity>
						</View>
						<View className="w-full mt-3 flex">
							<View className="flex flex-row w-full justify-between items-center">
								<View className="w-1/12 flex items-center">
									<View className="h-[35px] w-[2px] bg-black opacity-0"></View>
									<View className="h-5 w-5 bg-black rounded-full flex items-center justify-center">
										<Text className="text-white font-bold text-xs">1</Text>
									</View>
									<View className="h-[35px] w-[2px] bg-black"></View>
								</View>
								<TouchableOpacity onPress={() => {
									setAddressIndex(-1)
									pickupPointRef.current?.snapToIndex(0)
								}} activeOpacity={0.5} className="p-3 w-[87%] h-[70px] rounded-xl border-2 border-yellow-300">
									<Text className="text-base font-bold">Pickup Point</Text>
									<Text className="text-xs text-gray-500">Add a pickup point for the courier</Text>
								</TouchableOpacity>
							</View>
							<View className="flex flex-row w-full justify-between items-center">
								<View className="w-1/12 flex items-center">
									<View className="h-[35px] w-[2px] bg-black"></View>
									<View className="h-5 w-5 bg-black rounded-full flex items-center justify-center">
										<Text className="text-white font-bold text-xs">2</Text>
									</View>
									<View className="h-[35px] w-[2px] bg-black"></View>
								</View>
								<TouchableOpacity onPress={() => {
									setAddressIndex(0)
									dropPointRef.current?.snapToIndex(0)
								}} className="p-3 w-[87%] h-[70px] rounded-xl border-2 border-yellow-300">
									<Text className="text-base font-bold">Delivery Point</Text>
									<Text className="text-xs text-gray-500">Add a delivery point for the courier</Text>
								</TouchableOpacity>
							</View>
							{
								dropLocations?.map((drop, index) => {
									return <View key={index} className="flex flex-row w-full justify-between items-center">
										<View className="w-1/12 flex items-center">
											<View className="h-[35px] w-[2px] bg-black"></View>
											<View className="h-5 w-5 bg-black rounded-full flex items-center justify-center">
												<Text className="text-white font-bold text-xs">{3 + index}</Text>
											</View>
											<View className="h-[35px] w-[2px] bg-black"></View>
										</View>
										<View className="p-3 w-[87%] h-[70px] rounded-xl border-2 border-yellow-300 flex flex-row justify-between">
											<View>
												<Text className="text-base font-bold">Delivery Point</Text>
												<Text className="text-xs text-gray-500">Add a delivery point for the courier</Text>
											</View>
											<View className="h-10 w-10 flex justify-center items-end">
												<TouchableOpacity onPress={() => {
													removeComponentAtIndex(index)
												}}>
													<Icon type='font-awesome' name='trash' size={20} color={"red"} />
												</TouchableOpacity>
											</View>
										</View>
									</View>
								})
							}
							<View className="flex flex-row w-full justify-between items-center">
								<View className="w-1/12 flex items-center">
									<View className="h-[35px] w-[2px] bg-black"></View>
									<View className="h-5 w-5 bg-black rounded-full flex items-center justify-center">
										<Text className="text-white font-bold text-xs">+</Text>
									</View>
									<View className="h-[35px] w-[2px] bg-black opacity-0"></View>
								</View>
								<TouchableOpacity onPress={() => {
									let arr = [...dropLocations];
									arr.push({
										new: true
									})
									setDropLocations(arr)
								}} className="p-3 w-[87%] h-[70px] rounded-xl border-2 border-yellow-300">
									<Text className="text-base font-bold">Add a Delivery Point</Text>
									<Text className="text-xs text-gray-500">Add a delivery point for the courier</Text>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableHighlight disabled={
							orderState?.parcel_weight === undefined
						} style={{
							shadowColor: 'rgba(0,0,0, .8)', // IOS
							shadowOffset: { height: 5, width: 1 }, // IOS
							shadowOpacity: 1, // IOS
							shadowRadius: 1, //IOS
							elevation: 4, // Android
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'row',
							backgroundColor: orderState?.parcel_weight === undefined ? "#eee" : "#facc15"
						}} touchSoundDisabled={true} className=" min-w-[50%] mt-6 flex justify-center rounded-full text-center px-4 py-4 bg-yellow-400" onPress={() => {
							navigation.navigate("OrderDetails")
						}} >
							{loading ? <ActivityIndicator color={"#ffffff"} size={"small"} /> : <Text className="text-center font-bold text-white">{"Continue"}</Text>}
						</TouchableHighlight>
					</View>
				</ScrollView>
			</Layout>

			<BottomSheet
				ref={weightRef}
				index={-1}
				backdropComponent={renderBackdrop}
				snapPoints={weightSnapPoints}
				enablePanDownToClose={true}
			>
				<BottomSheetView>
					<View className="px-8 py-2">
						<Text className="text-xl font-bold">Select the Parcel Weight</Text>
						<View className="mt-3">
							<TouchableOpacity onPress={() => {
								handleChange("parcel_weight", "0-1 kg");
								handleClosePress()
							}} className="py-4 border-b border-gray-200">
								<Text className="text-base">0-1 kg</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								handleChange("parcel_weight", "1-5 kg");
								handleClosePress()
							}} className="py-4 border-b border-gray-200">
								<Text className="text-base">1-5 kg</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								handleChange("parcel_weight", "5-10 kg");
								handleClosePress()
							}} className="py-4 border-b border-gray-200">
								<Text className="text-base">5-10 kg</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								handleChange("parcel_weight", "10-15 kg");
								handleClosePress()
							}} className="py-4 border-b border-gray-200">
								<Text className="text-base">10-15 kg</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {
								handleChange("parcel_weight", "15-20 kg");
								handleClosePress()
							}} className="py-4 border-b border-gray-200">
								<Text className="text-base">15-20 kg</Text>
							</TouchableOpacity>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheet>


			{/* Pickup Point */}
			<BottomSheet
				ref={pickupPointRef}
				index={-1}
				backdropComponent={renderBackdrop}
				snapPoints={addressSnapPoints}
				enablePanDownToClose={true}
			>
				<BottomSheetView>
					<View className="relative">
						{bottomSheetLoading && <View className="flex items-center justify-center absolute top-0 left-0 h-full w-full bg-white z-[1000]">
							<ActivityIndicator size={50} color={"#facc15"} />
						</View>}
						<View className="px-4 py-2">
							<Text className="text-xl font-bold">{"Add a Pickup Point"}</Text>
							<TouchableOpacity onPress={() => {
								handleAddressBottomSheet("pickup")
							}} className="py-4 bg-yellow-400 px-4 rounded-lg mt-4 flex flex-row justify-between items-center">
								<Text className="font-bold text-base text-white">Search using Google</Text>
								<Icon
									className="flex items-center justify-center"
									type='evil-icons'
									size={25}
									color="white"
									name="chevron-right"
								/>
							</TouchableOpacity>
							<View className={"mt-3 w-full "}>
								<Text className="font-bold mb-1">{"Phone Number"}:</Text>
								<TextInput
									value={pickup && pickup?.phone_number}
									onChangeText={(e) => {
										handleInputChange("pickup", 'phone_number', e)
									}} selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" placeholder={"Enter phone number"} keyboardType={"phone-pad"} />
							</View>
							<View className={"mt-3 w-full "}>
								<Text className="font-bold mb-1">{"Instructions"}:</Text>
								<TextInput onChangeText={(e) => {
									handleInputChange("pickup", 'instructions', e)
								}} value={pickup && pickup?.instructions} selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" placeholder={"Instructions for courier"} keyboardType={"default"} />
							</View>
							<View className={"mt-3 w-full flex flex-row justify-between items-center"}>
								<Text className="font-bold mb-1">{"Buy for me"}:</Text>
								<Switch
									trackColor={{ false: '#eee', true: '#ffea96' }}
									thumbColor={orderState?.buyMe ? '#facc15' : '#eee'}
									onValueChange={(e) => { handleChange("buyMe", e) }}
									value={orderState?.buyMe}
								/>
							</View>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheet>

			{/* Drop Point */}
			<BottomSheet
				ref={dropPointRef}
				index={-1}
				backdropComponent={renderBackdrop}
				snapPoints={addressSnapPoints}
				enablePanDownToClose={true}
			>
				<BottomSheetView>
					<View className="relative">
						{bottomSheetLoading && <View className="flex items-center justify-center absolute top-0 left-0 h-full w-full bg-white z-[1000]">
							<ActivityIndicator size={50} color={"#facc15"} />
						</View>}
						<View className="px-4 py-2">
							<Text className="text-xl font-bold">{"Add a Drop Point"}</Text>
							<TouchableOpacity onPress={() => {
								handleAddressBottomSheet("drop")
							}} className="py-4 bg-yellow-400 px-4 rounded-lg mt-4 flex flex-row justify-between items-center">
								<Text className="font-bold text-base text-white">Search using Google</Text>
								<Icon
									className="flex items-center justify-center"
									type='evil-icons'
									size={25}
									color="white"
									name="chevron-right"
								/>
							</TouchableOpacity>
							<View className={"mt-3 w-full "}>
								<Text className="font-bold mb-1">{"Phone Number"}:</Text>
								<TextInput
									value={drop && drop?.phone_number}
									onChangeText={(e) => {
										handleInputChange("drop", 'phone_number', e)
									}} selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" placeholder={"Enter phone number"} keyboardType={"phone-pad"} />
							</View>
							<View className={"mt-3 w-full "}>
								<Text className="font-bold mb-1">{"Instructions"}:</Text>
								<TextInput onChangeText={(e) => {
									handleInputChange("drop", 'instructions', e)
								}} value={drop && drop?.instructions} selectionColor={"#FEF9C3"} secureTextEntry={false} cursorColor={"#000"} className="border-2 border-yellow-400 rounded-lg text-base px-5 py-3" placeholder={"Instructions for courier"} keyboardType={"default"} />
							</View>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheet>


			<BottomSheet
				ref={searchAddressRef}
				index={-1}
				backdropComponent={renderBackdrop}
				snapPoints={searchSnapPoints}
			// enablePanDownToClose={true}
			>
				<BottomSheetView className="h-full w-full">
					<View className="py-2 h-full w-full">
						<View className="px-4 z-50">
							<Text className="mb-2 text-xl font-bold">Choose on map</Text>
							<GooglePlacesAutocomplete
								fetchDetails={true}
								nearbyPlacesAPI='GoogleReverseGeocoding'
								placeholder="Apartment or locality name"
								styles={{
									listView: {
										position: "absolute",
										backgroundColor: "#eee",
										top: 60,
										borderRadius: 8,
										zIndex: 100
									},
									textInput: {
										height: 55,
										borderWidth: 2,
										paddingHorizontal: 20,
										paddingVertical: 10,
										borderColor: "#facc15"
									},
									row: {
										paddingVertical: 15,
										backgroundColor: "#eee",
										borderRadius: 8
									}
								}}
								enablePoweredByContainer={false}
								query={{
									key: GOOGLE_PLACES_API_KEY,
									language: 'en',
								}}
								keepResultsAfterBlur={false}
								textInputProps={{
									onChangeText: (text) => {
										setReverseLocation(text)
									},
									value: reverseLocation,
									scrollEnabled: true,
									selectTextOnFocus: true,
								}}
								enableHighAccuracyLocation={true}
								onPress={(data, details = null) => {
									_mapRef.current.animateToRegion({
										latitude: details?.geometry?.location.lat,
										longitude: details?.geometry?.location.lng,
										latitudeDelta: 0.0041,
										longitudeDelta: 0.0021
									}, 2000)
									setMapData(details);
									setAddress({
										latitude: details?.geometry?.location.lat,
										longitude: details?.geometry?.location.lng,
										latitudeDelta: 0.0041,
										longitudeDelta: 0.0021
									})
								}}
								onFail={(error) => console.warn(error)}
							/>
						</View>
						<View className="mt-[70px] h-[71.5vh] w-full z-0 relative">
							<View style={{
								position: "absolute",
								zIndex: 1000,
								top: "50%",
								left: "50%",
								transform: [
									{ translateX: -15 },
									{ translateY: -15 }
								],
							}}>
								<Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/017/178/337/non_2x/location-map-marker-icon-symbol-on-transparent-background-free-png.png" }} style={{
									height: 30, width: 30, resizeMode: "contain"
								}} />
							</View>
							<MapView
								onRegionChangeComplete={(region, details) => {
									setAddress(region)
									Geocoder.from(region.latitude, region.longitude)
										.then(json => {
											var addressComponent = json.results[0].formatted_address;
											setReverseLocation(addressComponent);
											if (addressComponent && region) {
												console.log(addressComponent, addressIndex)
												handleInputChange(currentIndex, "address", {
													text: addressComponent,
													latitude: region.latitude,
													longitude: region.longitude,
												})
											}
										})
										.catch(error => console.warn(error));
									setMapData({
										geometry: {
											location: {
												lat: region.latitude,
												lng: region.longitude,
											}
										}
									})
								}}
								ref={_mapRef}
								provider={PROVIDER_GOOGLE}
								className="h-full w-full"
								initialRegion={{
									latitude: latLng?.latitude,
									longitude: latLng?.longitude,
									latitudeDelta: 0.0041,
									longitudeDelta: 0.0021
								}}
								region={address}
								// zoomTapEnabled={true}
								showsUserLocation={true}
								showsMyLocationButton={true}
								showsCompass={true}
								toolbarEnabled={true}
								zoomControlEnabled={true}
								mapType='standard'
							>
								{mapData && <Marker title='delivery' description='test description' coordinate={{
									latitude: mapData?.geometry?.location?.lat,
									longitude: mapData?.geometry?.location?.lng
								}} >
									<Image source={{
										uri: "https://icon-library.com/images/map-pin-icon-png/map-pin-icon-png-11.jpg",
										height: 25,
										width: 25,
										resizeMode: "contain",
									}}
										style={{ opacity: 0 }} />
								</Marker>}
							</MapView>
							<View className="flex flex-row items-center justify-center h-20 w-full absolute" style={{
								bottom: reverseLocation?.length > 3 ? 0 : -70
							}}>
								<TouchableOpacity activeOpacity={0.8} onPress={() => {
									searchAddressRef.current.close()
								}} className="w-32 flex-0 py-3 bg-yellow-400 px-4 rounded-lg mt-4 flex flex-row justify-between items-center">
									<Text className="font-bold text-base text-white mx-auto">Continue</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</BottomSheetView>
			</BottomSheet>
		</>
	)
}

export default CreateOrder


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f1',
	},
});
