import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants/api";
import AppStack from "./AppStack";

const RootNavigation = () => {
	const setUrlConfig = () => {
		axios.defaults.baseURL = BASE_URL;
	};

	useEffect(() => {
		setUrlConfig();
	}, []);

	return (
		<NavigationContainer>
			<AppStack />
		</NavigationContainer>
	);
};

export default RootNavigation;
