import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginVertical: 16,
	},
	selectButton: {
		backgroundColor: "blue",
		padding: 10,
		margin: 16,
		borderRadius: 8,
	},
	selectButtonText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	listContainer: {
		padding: 16,
	},
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		marginBottom: 16,
		padding: 8,
		alignItems: "center",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginLeft: 8,
	},
	details: {
		flex: 1,
		paddingLeft: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
	},
	description: {
		fontSize: 14,
		color: "#666",
	},
	location: {
		fontSize: 12,
		color: "#888",
		marginVertical: 4,
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
	},
	editButton: {
		marginRight: 12,
	},
	deleteButton: {
		marginRight: 12,
	},
	price: {
		marginLeft: "auto",
		fontSize: 16,
		fontWeight: "bold",
	},
	checkboxContainer: {
		marginLeft: 16,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderTopWidth: 1,
		borderColor: "#ddd",
		paddingBottom: 110,
	},
	selectAllContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	selectAllText: {
		marginLeft: 8,
	},
	totalPrice: {
		fontSize: 18,
		fontWeight: "bold",
	},
	checkoutButton: {
		backgroundColor: "red",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	checkoutText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	noResult: {
		flex: 1,
		paddingTop: 20,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default styles;
