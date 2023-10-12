import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { UseAuthContext } from "./AuthContext";
import axios from "axios";
import { UseAppContext } from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {

	const _initialPickupState = {
		address: "",
		instructions: "",
		phone_number: ""
	}
	const { user } = UseAuthContext()
	const [orderState, setOrderState] = useState()
	const [orders, setOrders] = useState([])
	const [pickup, setPickup] = useState(_initialPickupState)
	const [drop, setDrop] = useState(_initialPickupState)
	const [dropLocation, setDropLocation] = useState([])

	const handleChange = (field, e) => {
		const data = { ...orderState };
		data[field] = e
		setOrderState(data)
	}

	const getOrders = async () => {
		
	}

	// useEffect(() => {
	// 	if (user) {
	// 		getOrders()
	// 	}
	// }, [user]);

	const handleInputChange = (index, field, value) => {
		if (index === "pickup") {
			const data = { ...pickup };
			data[field] = value
			setPickup(data)
			console.log("pickup: ", data)
		} else if (index === "drop") {
			const data = { ...drop };
			data[field] = value
			setDrop(data)
			console.log("drop: ", data)
		}
		// const updatedInputs = [...inputArray];
		// updatedInputs[index][field] = value;
		// setInputArray(updatedInputs);
	};
	return <OrderContext.Provider value={{ pickup, setPickup, drop, setDrop, dropLocation, setDropLocation, handleInputChange, orderState, setOrderState, handleChange, orders, getOrders }}>
		{children}
	</OrderContext.Provider>
}

const UseOrderContext = () => {
	return useContext(OrderContext);
}

export { OrderContextProvider, UseOrderContext };