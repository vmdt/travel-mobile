import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({ children, bg }) => {
	const { top, bottom } = useSafeAreaInsets();
	const paddingTop = top > 0 ? top + 5 : 30;
	// const paddingBottom = bottom > 0 ? bottom + 5 : 100;

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: bg,
				paddingTop,
				// paddingBottom,
			}}
		>
			{children}
		</View>
	);
};

export default ScreenWrapper;
