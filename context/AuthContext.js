import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { UseAppContext } from "./AppContext";
import { io } from "socket.io-client";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

	const [user, setUser] = useState();
	const [token, setToken] = useState("")
	const [socket, setSocket] = useState()
	const navigation = useNavigation()

	const getUser = async () => {
		const user = await AsyncStorage.getItem("user");
		if (user) {
			return JSON.parse(user)
		} else {
			return undefined;
		}
	}

	const logout = () => {
		// AsyncStorage.removeItem("token")
		// AsyncStorage.removeItem("user")
		navigation.navigate("SignUp")
	}

	const checkIfAuthed = async () => {
		if (token) {
			navigation.navigate("Send")
			axios(`https://instaport-api.vercel.app/user/`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
				.then((res) => {
					AsyncStorage.setItem("user", JSON.stringify(res?.data?.user))
					setUser(res?.data?.user)
				})
		} else {
			navigation.navigate("SignUp")
		}
	}

	useEffect(() => {
		if (token) {
			const socket = io("http://192.168.43.19:5000", {
				transports: ["websocket"]
			});
			socket.on("connection", () => {
				console.log("Connected: ", socket.id)
			})
			socket.on("disconnect", (res) => {
				console.log(res)
			})
			socket.on("send-data", (data) => {
				console.log(data)
			})
		}
		checkIfAuthed()
	}, [token]);

	return <AuthContext.Provider value={{ user, getUser, logout, socket, token, setToken }}>
		{children}
	</AuthContext.Provider>
}

const UseAuthContext = () => {
	return useContext(AuthContext);
}

export { AuthContextProvider, UseAuthContext };