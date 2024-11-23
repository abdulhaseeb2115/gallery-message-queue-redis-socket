import { Worker } from "bullmq";
import { io } from "../app.js";
import {
	JOB_STATUS,
	QUEUE_NAME,
	SOCKET_EVENT_NAME,
} from "../constants/index.js";
import { readJobs, writeJobs } from "../utils/fileHandler.js";
import connection from "../utils/redisConnection.js";

/**
 * Run jobs in a queue
 * Simulate a random delay between 5 seconds to 5 minutes
 * Fetch random unsplash image
 * Update job status and save in json file
 * Return jobId and imageUrl
 */
const worker = new Worker(
	QUEUE_NAME,
	async (job) => {
		const { jobId } = job.data;

		// Step 1
		console.log("\n- Worker started a job with id:", jobId);

		const delay = Math.floor(Math.random() * 60) * 5 + 5;

		// Step 2
		console.log("-- Worker added a delay:", delay);
		await new Promise((resolve) => setTimeout(resolve, delay * 1000));

		try {
			const response = await fetch(
				`https://api.unsplash.com/photos/random/?query=food&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch image: ${response.statusText}`);
			}

			// Step 3
			console.log("--- Worker fetched image");

			const data = await response.json();
			const imageUrl = data.urls?.small;

			const jobs = readJobs();
			const jobIndex = jobs.findIndex((j) => j.id === jobId);
			if (jobIndex !== -1) {
				jobs[jobIndex].status = JOB_STATUS.resolved;
				jobs[jobIndex].image = imageUrl;
				writeJobs(jobs);
			}

			// Step 4
			console.log("---- Worker updated job status & image");

			return { id: jobId, image: imageUrl, status: JOB_STATUS.resolved };
		} catch (err) {
			console.error("Error fetching image from Unsplash:", err);
			throw err;
		}
	},
	{ connection }
);

/**
 * Worker events
 */
worker.on("ready", () => {
	console.log(`- Worker is ready`);
});

worker.on("completed", (job, result) => {
	// fire socket event
	io.emit(SOCKET_EVENT_NAME, result);

	// log details
	console.log("----- Socket success event fired");
	console.log(`------ Job ${job.id} completed:`, result);
});

worker.on("failed", (job, err) => {
	// fire socket event
	io.emit(SOCKET_EVENT_NAME, {
		id: job.id,
		status: JOB_STATUS.failed,
		image: "",
	});

	// log details
	console.log(`\n! Job ${job.id} failed: ${err.message}`);
	console.log("! Socket failure event fired");

	// Update job status in json file
	const jobs = readJobs();
	const jobIndex = jobs.findIndex((j) => j.id === jobId);
	if (jobIndex !== -1) {
		jobs[jobIndex].status = JOB_STATUS.failed;
		writeJobs(jobs);
	}
});

export { worker };
