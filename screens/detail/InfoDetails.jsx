import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-svg";
import { ReusableText } from "../../components";
import { COLORS, SIZES } from "../../constants/theme";

const InfoDetails = ({ tourData }) => {
	const renderItem = ({ item, isInclusion }) => (
		<View style={{ flexDirection: "row" }}>
			{isInclusion ? (
				<Ionicons name="checkmark" size={16} color={COLORS.green} />
			) : (
				<Ionicons name="close" size={16} color={COLORS.red} />
			)}

			<ReusableText
				text={item}
				family="regular"
				size={SIZES.small}
				style={{ marginLeft: 5 }}
			/>
		</View>
	);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginTop: 5,
					justifyContent: "space-between",
				}}
			>
				<View style={{ flexDirection: "row", gap: 5 }}>
					<ReusableText
						text="From"
						size={SIZES.medium}
						family="bold"
						style={{ marginTop: 10, alignSelf: "center" }}
					/>

					<ReusableText
						text={`$${tourData?.regularPrice}`}
						size={SIZES.large}
						color={COLORS.green}
						family="bold"
						style={{ marginTop: 10, alignSelf: "center" }}
					/>

					<ReusableText
						text="per person"
						size={SIZES.medium}
						family="bold"
						style={{ marginTop: 10, alignSelf: "center" }}
					/>
				</View>

				<View
					style={{
						backgroundColor: COLORS.red,
						borderRadius: 5,
						paddingVertical: 5,
						paddingHorizontal: 10,
						alignItems: "center",
					}}
				>
					<ReusableText
						text={
							tourData?.ratingAverage > 4.7
								? "Likely to sell out"
								: "Best Choice"
						}
						family="bold"
						size={14}
						color={COLORS.white}
					/>
				</View>
			</View>

			<ReusableText
				text={tourData?.description ?? tourData?.summary}
				size={SIZES.small}
				style={{ marginTop: 10 }}
			/>

			<ReusableText
				text="Inclusions: "
				size={SIZES.medium}
				family="bold"
				style={{ marginTop: 20 }}
			/>
			<ScrollView horizontal={true}>
				<FlatList
					data={tourData?.inclusions}
					renderItem={({ item }) => renderItem({ item, isInclusion: true })}
				/>
			</ScrollView>

			<ReusableText
				text="Exclustions: "
				size={SIZES.medium}
				family="bold"
				style={{ marginTop: 20 }}
			/>
			<ScrollView horizontal={true}>
				<FlatList
					data={tourData?.exclusions}
					renderItem={({ item }) => renderItem({ item, isInclusion: false })}
				/>
			</ScrollView>

			<ReusableText
				text="Location: "
				size={SIZES.medium}
				family="bold"
				style={{ marginTop: 20 }}
			/>

			<MapView
				style={{ height: 200, marginVertical: 10 }}
				initialRegion={{
					latitude: tourData?.startLocation?.coordinates[1],
					longitude: tourData?.startLocation?.coordinates[0],
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				}}
			>
				<Marker
					coordinate={{
						latitude: tourData?.startLocation?.coordinates[1],
						longitude: tourData?.startLocation?.coordinates[0],
					}}
					title={tourData?.title}
				/>
			</MapView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingBottom: 20,
		paddingTop: 10,
	},
});

export default InfoDetails;
