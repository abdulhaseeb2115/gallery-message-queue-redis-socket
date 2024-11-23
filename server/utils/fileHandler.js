import fs from "fs";
import path from "path";

// data file path
const DATA_FILE = path.resolve("data.json");

// read json file
export const readJobs = () => {
	return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
};

// write to json file
export const writeJobs = (data) => {
	return fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};
