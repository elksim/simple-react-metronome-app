import { View, Text, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

import { useMetronomeContext } from "../../contexts/metronomeContext";

export function Debug() {
	const metronome = useMetronomeContext();

	function handlePress() {
		console.log("metronome: ", metronome);
		try {
			// const { sound } = await Audio.Sound.createAsync(
			// 	require("../../../assets/clicks/click1-30.wav")
			// );
			// console.log("sound: ", sound);
			console.log("metronome ", metronome);
			metronome.togglePlayPause();
		} catch (error) {
			console.log("error: ", error);
		}
	}

	return (
		<View style={styles.container}>
			<Text>Metronome Debug</Text>
			<Button onPress={handlePress} title="button" />
			<Text>bpm: {metronome.bpm} </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
	},
});
