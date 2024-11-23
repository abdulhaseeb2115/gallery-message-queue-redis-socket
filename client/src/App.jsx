import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobDetails from "./pages/JobDetails";
import JobsList from "./pages/JobsList";
import { NotFound } from "./pages/NotFound";

function App() {
	return (
		<main className="h-screen bg-white overflow-hidden">
			<Toaster />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<JobsList />} />
					<Route path="/job/:id" element={<JobDetails />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
