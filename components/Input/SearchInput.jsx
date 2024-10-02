import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";

const SearchInput = (props) => {
	return (
		<View
			style={[styles.container, props.containerStyles && props.containerStyles]}
		>
			<TextInput
				style={{ flex: 1 }}
				placeholderTextColor={COLORS.gray}
				ref={props.inputRef && props.inputRef}
				{...props}
			/>
			<TouchableOpacity
				style={{ marginLeft: 8 }}
				onPress={() => {
					props.inputRef.current.blur();
				}}
			>
				<View
					style={{
						backgroundColor: COLORS.lightGreen,
						borderRadius: 50,
						padding: 10,
					}}
				>
					{props.icon}
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 50,
		borderColor: COLORS.gray,
		borderWidth: 1,
		borderRadius: SIZES.large,
		borderCurve: "continuous",
		paddingHorizontal: SIZES.medium,
		alignItems: "center",
		gap: SIZES.small,
	},
});

export default SearchInput;
