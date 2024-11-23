import { io } from "socket.io-client";

let socket = null;

const initializeSocket = () => {
	if (!socket) {
		socket = io(import.meta.env.VITE_API_URL);
	}
};

const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};

export { initializeSocket, disconnectSocket, socket };
