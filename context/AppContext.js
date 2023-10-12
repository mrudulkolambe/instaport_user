import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { useRef } from "react";

const { useContext } = require("react")
const { createContext } = require("react")

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
	// const baseURL = "http://192.168.0.104:3000";
	const baseURL = "https://instaport-api.vercel.app";
	const [latLng, setLatLng] = useState();

	const getLocation = async () => {
		try {
			const { granted } = await Location.requestForegroundPermissionsAsync();
			if (!granted) {
				return
			} else {
				const {
					coords: { latitude, longitude }
				} = await Location.getCurrentPositionAsync();
				setLatLng({ latitude: latitude, longitude: longitude })
			}
		} catch (error) {
			console.warn(error)
		}
	}

	const check_permission = async () => {
		const hasPermission = await Location.requestForegroundPermissionsAsync();
		if (hasPermission.status === "granted") {
			const permission = await askPermission();
			return permission;
		} else {
			return true
		}
	}


	useEffect(() => {
		check_permission()
		getLocation();
	}, []);

	
	const askPermission = async () => {
		const permission = await Location.requestForegroundPermissionsAsync();
		return permission.status === "granted"
	}
	return <AppContext.Provider value={{ baseURL, check_permission, askPermission, latLng }}>
		{children}
	</AppContext.Provider>
}

const UseAppContext = () => {
	return useContext(AppContext);
}

export { AppContextProvider, UseAppContext }