import { Button, StyleSheet, Text, View } from "react-native";

import { Slider } from "@react-native-assets/slider";
import { useMetronomeContext } from "../../contexts/metronomeContext";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-end",
	},
	titles: {
		alignSelf: "center",
		fontWeight: "800",
	},
	//
	sliderContainer: {
		margin: 5,
	},
	sliderMarkerContainer: {
		// flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	sliderMarkers: {
		marginLeft: 3,
		marginRight: 3,
	},
	slider: {
		height: 30,
		backgroundColor: "orange",
	},
});

export function Controls() {
	const metronome = useMetronomeContext();
	const [resume, setResume] = useState(false);

	function handleVolumeValueChange(newVolume) {
		metronome.setVolume(newVolume);
	}

	function handleBpmSlidingStart() {
		if (metronome.click !== undefined) {
			setResume(true);
		}
		metronome.stop();
	}
	function handleBpmValueChange(newBpm) {
		metronome.setBpm(newBpm);
	}

	async function handleBpmSlidingComplete() {
		if (resume) {
			metronome.play();
			setResume(false);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.sliderContainer}>
				<Text style={styles.titles}>Bpm</Text>
				<View style={styles.sliderMarkerContainer}>
					<Text style={styles.sliderMarkers}>30</Text>
					<Text style={styles.sliderMarkers}>300</Text>
				</View>
				<Slider
					style={styles.slider}
					value={100}
					minimumValue={30}
					maximumValue={300}
					step={1}
					onSlidingStart={handleBpmSlidingStart}
					onValueChange={(value) => handleBpmValueChange(value)}
					onSlidingComplete={handleBpmSlidingComplete}
				></Slider>
			</View>
			<View style={styles.sliderContainer}>
				<Text style={styles.titles}>Volume</Text>
				<View style={styles.sliderMarkerContainer}>
					<Text style={styles.sliderMarkers}>0</Text>
					<Text style={styles.sliderMarkers}>1</Text>
				</View>
				<Slider
					style={styles.slider}
					onValueChange={(value) => handleVolumeValueChange(value)}
					value={0.5}
					step={0.01}
				></Slider>
			</View>
			<PlayPause />
		</View>
	);
}

function PlayPause() {
	const metronome = useMetronomeContext();
	const buttonText = metronome.click === undefined ? "PLAY" : "PAUSE";

	function handlePress() {
		if (metronome.click === undefined) {
			metronome.play();
		} else {
			metronome.stop();
		}
	}

	return (
		<>
			<Button title={buttonText} onPress={handlePress} />
		</>
	);
}
