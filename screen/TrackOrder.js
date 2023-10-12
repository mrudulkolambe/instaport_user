import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import Layout from '../components/Layout'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'
import { useRef, useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TrackOrder = ({ route }) => {
	const { width, height } = Dimensions.get('window');
	const { latLng } = UseAppContext();
	const GOOGLE_MAPS_APIKEY = "AIzaSyCQb159dbqJypdIO1a1o0v_mNgM5eFqVAo";
	const [resultData, setResultData] = useState()
	const [data, setData] = useState()
	const [markers, setMarkers] = useState([])

	const fetchData = async () => {
		if (route?.params?._id) {
			axios(`https://instaport-api.vercel.app/order/customer/${route.params._id}`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${await AsyncStorage.getItem("token")}`
				}
			})
				.then((res) => {
					setData(res.data.order)
					const array = []
					array.push({ ...res?.data?.order?.pickup, type: "pickup" });
					res.data?.order?.drop?.forEach((item) => {
						array.push({ ...item, type: "drop" })
					})
					setMarkers(array)
				})
		}
	}
	useEffect(() => {
		fetchData()
	}, [route]);

	const _mapRef = useRef();
	return (
		<>
			<Layout navbar={true} topbar={true} title={`Tracking #${route?.params?._id?.slice(15)}`}>
				<View className="h-1/2 w-full">
					{latLng && <MapView
						ref={_mapRef}
						provider={PROVIDER_GOOGLE}
						className="h-full w-full"
						initialRegion={{
							latitude: latLng?.latitude,
							longitude: latLng?.longitude,
							latitudeDelta: 0.9,
							longitudeDelta: 0.9,
						}}
						mapType='standard'
						showsMyLocationButton={true}
						toolbarEnabled={true}
						followsUserLocation={true}
						showsUserLocation={true}
						zoomControlEnabled={true}
						zoomTapEnabled={true}
					>
						<MapViewDirections
							optimizeWaypoints={true}
							onReady={result => {
								setResultData(result)
								_mapRef.current.fitToCoordinates(result.coordinates, {
									edgePadding: {
										right: (width / 20),
										bottom: (height / 20),
										left: (width / 20),
										top: (height / 20),
									}
								});
							}}
							mode='DRIVING'
							strokeWidth={3}
							strokeColor='black'
							origin={{
								latitude: data?.pickup?.address?.latitude,
								longitude: data?.pickup?.address?.longitude,
							}}
							destination={{
								latitude: data?.drop[0]?.address?.latitude,
								longitude: data?.drop[0]?.address?.longitude
							}}
							apikey={GOOGLE_MAPS_APIKEY}
						/>
						{
							markers?.map((location, index) => {
								return <Marker
									key={index}
									style={{
										height: 12
									}}
									// image={"https://www.pngitem.com/pimgs/m/334-3347279_lorry-lorry-map-marker-svg-hd-png-download.png"}
									coordinate={{
										latitude: location?.address?.latitude,
										longitude: location?.address?.longitude
									}} >
								</Marker>
							})
						}
					</MapView>}
				</View>
				{data?.status === "processing" && <View className="p-3 h-1/2 w-full bg-white rounded-2xl">
					<Text className="text-[24px] font-bold text-center">Looking for riders!</Text>
					<Text className="text-center mt-1">Time: {Math.round(Number(resultData?.duration))} min</Text>
					{/* <Text className="text-center mt-1">Arriving at pickup point in {Math.round(Number(resultData?.duration))} min</Text> */}

				</View>}
				{data?.status !== "processing" && <View className="p-3 h-1/2 w-full bg-white rounded-2xl">
					{/* <Text className="text-[24px] font-bold text-center">Looking for riders!</Text> */}
					<Text className="text-center mt-1">Arriving at pickup point in {Math.round(Number(resultData?.duration))} min</Text>
					<Text className="text-center mt-1">Time: {Math.round(Number(resultData?.duration))} min</Text>

				</View>}
			</Layout>
		</>
	)
}

export default TrackOrder