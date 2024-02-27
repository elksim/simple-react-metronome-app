import { Main } from "./Main";

import { MetronomeProvider } from "./src/contexts/metronomeContext";

export default function App() {
	return (
		<MetronomeProvider>
			<Main />
		</MetronomeProvider>
	);
}
