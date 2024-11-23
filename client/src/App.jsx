import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConnectionBanner from "./components/ConnectionBanner";
import { NetworkContext } from "./context/NetworkContext";
import JobDetails from "./pages/JobDetails";
import JobsList from "./pages/JobsList";
import { NotFound } from "./pages/NotFound";
import { disconnectSocket, initializeSocket } from "./socket";

function App() {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	/**
	 * Listen to online and offline events
	 */
	useEffect(() => {
		window.addEventListener("online", () => {
			toast("✔️ You are back online.", { id: "online" });
			setIsOnline(true);
		});
		window.addEventListener("offline", () => setIsOnline(false));

		return () => {
			window.removeEventListener("online", () => setIsOnline(true));
			window.removeEventListener("offline", () => setIsOnline(false));
		};
	}, []);

	/**
	 * Initialze socket connection
	 */
	useEffect(() => {
		initializeSocket();

		return () => {
			disconnectSocket();
		};
	}, []);

	return (
		<NetworkContext.Provider value={isOnline}>
			<main className="h-screen bg-white flex flex-col overflow-hidden">
				<Toaster />
				{!isOnline && <ConnectionBanner />}

				<div className="flex-1 overflow-hidden">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<JobsList />} />
							<Route path="/job/:id" element={<JobDetails />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</div>
			</main>
		</NetworkContext.Provider>
	);
}

export default App;
