import { Queue } from "bullmq";
import Redis from "ioredis";
import { QUEUE_NAME } from "../constants/index.js";

/**
 * Create redis connection
 */
const connection = new Redis({
	host: process.env.REDIS_HOST || "127.0.0.1",
	port: process.env.REDIS_PORT || 6379,
	maxRetriesPerRequest: null,
});

/**
 * Job Queue
 */
const jobQueue = new Queue(QUEUE_NAME, { connection });
export default jobQueue;
