import React from "react";
import { FlatList, View } from "react-native";
import GroupCard from "../CardItem/GroupCard";

const GroupListings = ({ listings }) => {
	const rederItems = ({ item }) => {
		return <GroupCard item={item} />;
	};

	return (
		<View>
			<FlatList
				data={listings}
				renderItem={rederItems}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default GroupListings;
