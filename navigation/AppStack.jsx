import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import { Login, Onboarding, OTPVerification, Signup } from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";

const AppStack = () => {
	const Stack = createNativeStackNavigator();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	return (
		<Stack.Navigator initialRouteName={isLoggedIn ? "BottomTab" : "Onboard"}>
			<Stack.Screen
				name="Onboard"
				component={Onboarding}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Signup"
				component={Signup}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="OTPVerification"
				component={OTPVerification}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="BottomTab"
				component={BottomTabNavigation}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
