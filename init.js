const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const bpmMin = 30;
const bpmMax = 300;
const inputDir = "./assets/raw_clicks/";
const outputDir = "./assets/clicks/";

fs.readdir(inputDir, (err, files) => {
	files.forEach((file) => {
		const inputPath = `${inputDir}/${file}`;

		const parsedPath = path.parse(inputPath);
		const inputFileName = parsedPath.name;

		const outputPathStem2 = `${outputDir}/${inputFileName}`;
		for (let bpm = bpmMin; bpm <= bpmMax; bpm += 1) {
			const outputPath = `${outputPathStem2}-${bpm}.wav`;
			generateClick(inputPath, outputPath, bpm);
		}
	});
});

populatePathFile();

function generateClick(inputPath, outputPath, bpm) {
	ffmpeg.ffprobe(inputPath, (err, inputMetadata) => {
		const inputNTicks = inputMetadata.streams[0].duration_ts;
		const inputSampleRate = inputMetadata.streams[0].sample_rate;

		const outputNTicks = (60 / bpm) * inputSampleRate;
		const nSilentSamples = outputNTicks - inputNTicks;
		ffmpeg()
			.input(inputPath)
			.complexFilter([
				`aevalsrc=0:d=2[s1]`,
				`[s1]atrim=end_sample=${nSilentSamples}[s2]`,
				`[0:a][s2]concat=n=2:v=0:a=1[out]`,
			])
			.map("[out]")
			.save(outputPath);
	});
}

function populatePathFile() {
	let lines = [];

	lines.push("export let paths = {};");
	for (let bpm = 30; bpm <= 300; bpm++) {
		lines.push(
			`paths["click1-${bpm}"] = require("./assets/clicks/click1-${bpm}.wav");`
		);
	}
	lines.push("export default paths");
	const string = lines.join("\n");
	fs.writeFileSync("paths.js", string);
}
