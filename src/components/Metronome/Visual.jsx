import { StyleSheet, Text, View } from "react-native";

export function Visual() {
	return (
		<View style={styles.container}>
			<Text>Visual of Metronome</Text>
		</View>
	);
}

styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
