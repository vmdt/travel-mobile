import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import {
	BookingDetails,
	Checkout,
	ForgotPassword,
	Login,
	MyWebView,
	Onboarding,
	OTPVerification,
	ResetPassword,
	Search,
	Signup,
	TourDetail,
} from "../screens";
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
				name="ForgotPassword"
				component={ForgotPassword}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ResetPassword"
				component={ResetPassword}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Search"
				component={Search}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="TourDetail"
				component={TourDetail}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="BottomTab"
				component={BottomTabNavigation}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Checkout"
				component={Checkout}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="MyWebView"
				component={MyWebView}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="BookingDetails"
				component={BookingDetails}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
