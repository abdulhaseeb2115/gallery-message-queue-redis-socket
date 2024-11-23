import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import jobsRoutes from "./routes/jobRoutes.js";
import "./workers/jobWorker.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/jobs", jobsRoutes);

// Socket
io.on("connection", (socket) => {
	console.log("- Socket client connected:", socket.id);

	socket.on("disconnect", () => {
		console.log("- Socket client disconnected:", socket.id);
	});
});

// Server
server.listen(PORT, () => {
	console.log(`- Server is running on port ${PORT}`);
});

export { io };
