import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const Home = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<View>
			<Text>Home</Text>
			<Text>{user.email}</Text>
			<Text>{user.username}</Text>
		</View>
	);
};

export default Home;
