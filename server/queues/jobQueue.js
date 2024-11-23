import { Queue } from "bullmq";
import { QUEUE_NAME } from "../constants/index.js";
import connection from "../utils/redisConnection.js";

/**
 * Job Queue
 */
const jobQueue = new Queue(QUEUE_NAME, { connection });
export default jobQueue;
