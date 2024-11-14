import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import WebView from "react-native-webview";
import { ScreenWrapper } from "../../components";

const MyWebView = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { url } = route.params;

	return (
		<ScreenWrapper>
			{/* <BackButton size={SIZES.xLarge} onPress={() => navigation.goBack()} /> */}
			<WebView
				javaScriptCanOpenWindowsAutomatically={true}
				source={{ uri: url }}
			/>
		</ScreenWrapper>
	);
};

export default MyWebView;
