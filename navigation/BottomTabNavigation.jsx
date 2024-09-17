import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { Cart, Home, Profile } from "../screens";
import { COLORS } from "../constants/theme";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size, focused }) => {
					let iconName;

					switch (route.name) {
						case "Home":
							iconName = focused ? "grid" : "grid-outline";
							break;
						case "Cart":
							iconName = focused ? "cart" : "cart-outline";
							break;
						case "Profile":
							iconName = focused ? "person" : "person-outline";
							break;
					}
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarLabel: () => null,
				tabBarStyle: styles.tabBarStyle,
				tabBarItemStyle: styles.tabBarItemStyle,
				tabBarActiveBackgroundColor: COLORS.lightGreen,
				tabBarActiveTintColor: COLORS.white,
				headerShown: false,
			})}
		>
			<Tab.Screen name="Home" component={Home} />

			{/* <Tab.Screen name="Chat" component={Chat} /> */}

			<Tab.Screen name="Cart" component={Cart} />

			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	tabBarStyle: {
		height: 80,
		backgroundColor: COLORS.white,
		position: "absolute",
		bottom: 10,
		left: 20,
		right: 20,
		borderRadius: 40,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 5,
	},
	tabBarItemStyle: {
		paddingVertical: 10,
		margin: 10,
		borderRadius: 40,
	},
});

export default BottomTabNavigation;
