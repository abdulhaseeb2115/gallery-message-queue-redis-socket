import { JOB_STATUS } from "../constants/index.js";
import jobQueue from "../queues/jobQueue.js";
import { readJobs, writeJobs } from "../utils/fileHandler.js";

/**
 * Create a new job
 * Store it in json file
 * Add Job to queue
 * Send JobId in response
 */
export const createJob = (req, res) => {
	const jobs = readJobs();
	const jobId = jobs.length + 1;
	const newJob = { id: jobId, status: JOB_STATUS.pending, image: "" };

	jobs.push(newJob);
	writeJobs(jobs);

	jobQueue.add("fetchImage", { jobId });

	res.status(201).json(newJob);
};

/**
 * Read all jobs from json file
 * Send jobs in response
 */
export const getAllJobs = (req, res) => {
	const jobs = readJobs();
	res.status(200).json(jobs);
};

/**
 * Get id from request
 * Read jobs from json file
 * Find a job by id
 * Send job in response
 */
export const getJobById = (req, res) => {
	const jobs = readJobs();
	const job = jobs.find((job) => job.id == req.params.id);

	if (!job) {
		return res.status(404).json({ message: "Job not found" });
	}

	res.status(200).json(job);
};

// https://api.unsplash.com/photos/random/?query=food&client_id=J25-zqkLDHDzfIcE7nroZSL9ngS5mFPqBwd3qLaSqa8
