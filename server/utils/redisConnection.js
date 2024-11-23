import Redis from "ioredis";

/**
 * Create redis connection
 */
const connection = new Redis({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	maxRetriesPerRequest: null,
	password: process.env.REDIS_PASSWORD,
});

export default connection;
