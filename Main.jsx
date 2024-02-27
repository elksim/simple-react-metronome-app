import { View, Text, StatusBar, StyleSheet } from "react-native";

import { Metronome } from "./src/components/Metronome/";

export function Main() {
	return (
		<>
			<View style={styles.container}>
				<Metronome />
				<StatusBar style="auto" />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#beb5b5",
		alignItems: "center",
		justifyContent: "center",
	},
});
