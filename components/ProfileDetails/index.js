import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, SIZES } from "../../constants/theme";
import { updateUserProfile } from "../../redux/actions/authAction";
import ReusableBtn from "../Buttons/ReusableBtn";
import Input from "../Input/Input";
import HeightSpacer from "../Reusable/HeightSpacer";
import ReusableText from "../Reusable/ReusableText";

const ProfileDetails = () => {
	const dispatch = useDispatch();
	const { user, accessToken } = useSelector((state) => state.auth);
	const [fullname, setFullname] = useState(user?.fullname);
	const [phone, setPhone] = useState(user?.phone);
	const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth);
	const [address, setAddress] = useState(user?.address);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.row}>
				<ReusableText text="Full Name" family="medium" size={SIZES.medium} />
				<Input
					placeholder="Full Name"
					containerStyles={{ height: 60 }}
					value={fullname}
					onChangeText={setFullname}
				/>
			</View>

			<View style={styles.row}>
				<ReusableText text="Phone Number" family="medium" size={SIZES.medium} />
				<Input
					placeholder="Phone Number"
					containerStyles={{ height: 60 }}
					value={phone}
					onChangeText={setPhone}
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
					value={dateOfBirth}
					onChangeText={setDateOfBirth}
				/>
			</View>

			<View style={styles.row}>
				<ReusableText text="Address" family="medium" size={SIZES.medium} />
				<Input
					placeholder="Address"
					containerStyles={{ height: 60 }}
					value={address}
					onChangeText={setAddress}
				/>
			</View>

			<ReusableBtn
				onPress={() => {
					dispatch(
						updateUserProfile(
							user?._id,
							{
								fullname,
								phone,
								dateOfBirth,
								address,
							},
							accessToken,
						),
					);
				}}
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

			<HeightSpacer height={100} />
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
