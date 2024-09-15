import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login, Onboarding, Signup } from "../screens";
import BottomTabNavigation from "./BottomTabNavigation";

const AppStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Onboard"
				component={Onboarding}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="BottomTab"
				component={BottomTabNavigation}
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
		</Stack.Navigator>
	);
};

export default AppStack;
