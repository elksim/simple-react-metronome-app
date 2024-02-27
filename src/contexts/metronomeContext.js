import { createContext, useReducer, useContext, useEffect } from "react";
import { Audio } from "expo-av";

import { paths as clickPaths } from "../../paths";

const initialState = {
	bpm: 100,
	clickName: "click1",
	click: undefined,
	volume: 0.5,
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_PAUSED":
			return { ...state, pause: action.payload };
		case "SET_BPM":
			return { ...state, bpm: action.payload };
		case "SET_CLICK_NAME":
			return { ...state, clickName: action.payload };
		case "SET_CLICK":
			return { ...state, click: action.payload };
		case "SET_VOLUME":
			return { ...state, volume: action.payload };
		default:
			return state;
	}
}

const MetronomeContext = createContext();

export function MetronomeProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	async function updateClick(newClickName, newBpm) {
		const pathsKey = `${newClickName}-${newBpm}`;
		const { sound: click } = await Audio.Sound.createAsync(
			clickPaths[pathsKey]
		);
		dispatch({ type: "SET_CLICK", payload: click });
		return click;
	}
	//
	async function stop() {
		try {
			await click.unloadAsync();
			dispatch({ type: "SET_CLICK", payload: undefined });
		} catch {}
	}
	async function play() {
		await stop();
		const curClick = await updateClick(state.clickName, state.bpm);
		try {
			await curClick.setIsLoopingAsync(true);
			await curClick.setVolumeAsync(state.volume);
			await curClick.playAsync();
		} catch (error) {
			console.log("error: ", error);
		}
	}

	async function setBpm(newBpm) {
		dispatch({ type: "SET_BPM", payload: newBpm });
	}
	async function setClickName(newClickName) {
		if (state.click !== undefined) {
			await state.click.unloadAsync();
		}
		dispatch({ type: "SET_CLICK_NAME", payload: newClickName });
		updateClick(newClickName, state.bpm);
		playPause();
	}

	async function setVolume(newVolume) {
		dispatch({ type: "SET_VOLUME", payload: newVolume });
		if (click !== undefined) {
			await click.setVolumeAsync(newVolume);
			console.log("click.volume: ", click.volume);
		}
	}

	const { bpm, clickName, click, volume } = state;
	return (
		<MetronomeContext.Provider
			value={{
				bpm,
				clickName,
				click,
				volume,
				stop,
				play,
				setBpm,
				setClickName,
				setVolume,
			}}
		>
			{children}
		</MetronomeContext.Provider>
	);
}

export function useMetronomeContext() {
	const context = useContext(MetronomeContext);
	return context;
}
