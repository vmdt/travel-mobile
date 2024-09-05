import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import RootNavigation from "./navigation";

export default function App() {
	const [fontsLoaded, error] = useFonts({
		regular: require("./assets/fonts/regular.otf"),
		medium: require("./assets/fonts/medium.otf"),
		bold: require("./assets/fonts/medium.otf"),
		light: require("./assets/fonts/light.otf"),
		xtrabold: require("./assets/fonts/xtrabold.otf"),
	});

	useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		console.log("Fonts was not loaded: ", error);
		return null;
	}

	return <RootNavigation />;
}
