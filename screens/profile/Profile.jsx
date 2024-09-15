import AntDesign from "@expo/vector-icons/AntDesign";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import {
	Booking,
	ProfileDetails,
	ReusableText,
	ScreenWrapper,
} from "../../components";
import { AVATAR_DEFAULT, COLORS, SIZES } from "../../constants/theme";
import styles from "./profile.style";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
	const { user } = useSelector((state) => state.auth);

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
						size={SIZES.xxLarge}
						color={COLORS.black}
					/>
					<TouchableOpacity onPress={() => {}}>
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
						source={{ uri: user?.profilePicture ?? AVATAR_DEFAULT }}
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
			<Tab.Navigator>
				<Tab.Screen name="Profile" component={ProfileDetails} />
				<Tab.Screen name="Booking" component={Booking} />
			</Tab.Navigator>
		</ScreenWrapper>
	);
};

export default Profile;
