import express from "express";
import {
	createJob,
	getAllJobs,
	getJobById,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob); // create job
router.get("/", getAllJobs); // get all jobs
router.get("/:id", getJobById); // get a job by id

export default router;
