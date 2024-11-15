import AntDesign from "@expo/vector-icons/AntDesign";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ProfileDetails, ReusableText, ScreenWrapper } from "../../components";
import { AVATAR_DEFAULT, COLORS, SIZES } from "../../constants/theme";
import { updateUserLogout } from "../../redux/actions/authAction";
import Booking from "../booking/Booking";
import styles from "./profile.style";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
	const navigator = useNavigation();
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<ReusableText
						text="Profile"
						family="xtrabold"
						size={SIZES.xLarge}
						color={COLORS.black}
					/>
					<TouchableOpacity
						onPress={() => {
							dispatch(updateUserLogout());
							navigator.navigate("Login");
						}}
					>
						<AntDesign name="logout" size={24} color="black" />
					</TouchableOpacity>
				</View>

				<View
					style={{
						display: "flex",
						alignItems: "center",
						marginVertical: 25,
						gap: 10,
					}}
				>
					<Image
						source={{ uri: user?.profilePicture || AVATAR_DEFAULT }}
						style={styles.image}
					/>
					<ReusableText
						text={user?.username}
						family="xtrabold"
						size={SIZES.large}
					/>

					<ReusableText
						style={{
							marginTop: -10,
						}}
						text={user?.email}
						family="bold"
					/>
				</View>
			</View>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
					tabBarStyle: styles.tabBarStyle,
					tabBarLabel: ({ focused, color }) => (
						<ReusableText
							text={route.name}
							family="bold"
							size={SIZES.medium}
							color={focused ? COLORS.lightGreen : COLORS.black}
						/>
					),
				})}
			>
				<Tab.Screen name="Profile Details" component={ProfileDetails} />
				<Tab.Screen name="Booking" component={Booking} />
			</Tab.Navigator>
		</ScreenWrapper>
	);
};

export default Profile;
