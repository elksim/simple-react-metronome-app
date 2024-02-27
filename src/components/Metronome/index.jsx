import { StyleSheet, View, Text, Button } from "react-native";

import { useMetronomeContext } from "../../contexts/metronomeContext";
import { Audio } from "expo-av";

import { Debug } from "./Debug";
import { Visual } from "./Visual";
import { Controls } from "./Controls";
import { Display } from "./Display";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "90%",
		margin: 20,
		justifyContent: "space-around",
		alignItems: "stretch",
		// borderWidth: 1,
		// borderColor: "blue",
	},
	component: {
		flex: 1,
		borderWidth: 1,
		margin: 5,
		// borderColor: "red",
		// color: "red",
	},
	display: {
		flex: 0.3,
		// alignItems: "center",
	},
});

export function Metronome() {
	return (
		<>
			<View style={styles.container}>
				<View style={styles.container}>
					<Visual />
				</View>
				<View style={[styles.component, styles.display]}>
					<Display />
				</View>
				<View style={styles.component}>
					<Controls />
				</View>
				<View style={styles.component}>
					<Debug />
				</View>
			</View>
		</>
	);
}
