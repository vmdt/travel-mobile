import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS, SIZES } from "../../constants/theme";
import ReusableBtn from "../Buttons/ReusableBtn";
import Input from "../Input/Input";
import ReusableText from "../Reusable/ReusableText";

const ProfileDetails = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.row}>
				<ReusableText
					text="Full Name"
					family="medium"
					size={SIZES.medium}
				/>
				<Input
					placeholder="Full Name"
					containerStyles={{ height: 60 }}
					value={user?.fullname}
				/>
			</View>

			<View style={styles.row}>
				<ReusableText
					text="Phone Number"
					family="medium"
					size={SIZES.medium}
				/>
				<Input
					placeholder="Phone Number"
					containerStyles={{ height: 60 }}
					value={user?.phone}
				/>
			</View>

			<View style={styles.row}>
				<ReusableText
					text="Date of Birth"
					family="medium"
					size={SIZES.medium}
				/>
				<Input
					placeholder="Date of Birth"
					containerStyles={{ height: 60 }}
					keyboardType="date"
					value={user?.dateOfBirth}
				/>
			</View>

			<View style={styles.row}>
				<ReusableText
					text="Address"
					family="medium"
					size={SIZES.medium}
				/>
				<Input
					placeholder="Address"
					containerStyles={{ height: 60 }}
					value={user?.address}
				/>
			</View>

			<ReusableBtn
				onPress={() => {}}
				btnText="Save"
				btnWidth={SIZES.full}
				backgroundColor={COLORS.lightGreen}
				textColor={COLORS.white}
				styleBtn={{ height: 60, width: "50%", alignSelf: "center" }}
				styleText={{
					fontSize: SIZES.xLarge,
					fontFamily: "xtrabold",
				}}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: SIZES.large + 5,
		paddingVertical: SIZES.medium,
		gap: 20,
	},
	row: {
		gap: 10,
	},
});

export default ProfileDetails;
