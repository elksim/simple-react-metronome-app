import { StyleSheet, Text, View } from "react-native";
import { useMetronomeContext } from "../../contexts/metronomeContext";

export function Display() {
	const metronome = useMetronomeContext();

	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text>BPM</Text>
				<Text style={styles.text}>{metronome.bpm}</Text>
			</View>
			<View style={styles.box}>
				<Text>VOL</Text>
				<Text style={styles.text}>{metronome.volume}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	box: {
		padding: 5,
		borderWidth: 1,
	},
	text: {
		width: 30,
	},
});
