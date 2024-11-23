import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import Skeleton from "../components/Skeleton";
import { SOCKET_EVENT_NAME } from "../constants";
import { NetworkContext } from "../context/NetworkContext";
import { createJob, getJobs } from "../requests";
import { socket } from "../socket";
import handleError from "../utils/errorHandler";
import handleSlowInternet from "../utils/slowInternetHandler";

const JobsList = () => {
	const navigate = useNavigate();
	const isOnline = useContext(NetworkContext);
	const [isLoading, setIsLoading] = useState(true);
	const [isCreating, setIsCreating] = useState(false);
	const [jobs, setJobs] = useState([]);

	/**
	 * Redirect to /job/{id}
	 */
	const handleCardClick = (id) => {
		if (isOnline) {
			navigate(`/job/${id}`);
		}
	};

	/**
	 * Create a new job
	 * Update state with new job
	 */
	const handleAddJobClick = async () => {
		if (isOnline) {
			try {
				setIsCreating(true);
				const response = await handleSlowInternet(() => createJob());
				setJobs((prev) => [...prev, response?.data]);
			} catch (error) {
				handleError(error);
			} finally {
				setIsCreating(false);
			}
		}
	};

	/**
	 * Fetch all jobs
	 * Update state with jobs
	 */
	const fetchJobs = async () => {
		try {
			setIsLoading(true);
			const response = await handleSlowInternet(() => getJobs());
			setJobs(response?.data);
		} catch (error) {
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Subscribe to socket
	 */
	useEffect(() => {
		if (socket) {
			socket.on(SOCKET_EVENT_NAME, (data) => {
				setJobs((prevJobs) =>
					prevJobs.map((job) =>
						job.id === data.id
							? { ...job, status: data?.status, image: data?.image }
							: job
					)
				);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	/**
	 * Fetch jobs
	 * Refresh on online
	 */
	useEffect(() => {
		if (isOnline) {
			fetchJobs();
		}
	}, [isOnline]);

	return (
		<div className="h-full w-full p-6 overflow-hidden">
			<header className="h-[10%] flex justify-between gap-5">
				<div className="text-lg font-bold uppercase text-blue-600">
					<h1>Calo Task</h1>
				</div>

				<button
					className="h-fit px-2.5 py-1.5 bg-blue-600 text-white font-medium rounded-full hover:scale-95 hover:opacity-90 ease-in-out duration-150 disabled:bg-gray-400 disabled:!scale-100 disabled:!opacity-100 disabled:cursor-default"
					disabled={isLoading || isCreating || !isOnline}
					onClick={handleAddJobClick}
				>
					Create Job +
				</button>
			</header>

			<div className="h-[90%] overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 bg-gray-100 rounded-xl">
				{isLoading ? (
					<Loader />
				) : (
					<>
						{jobs?.length > 0
							? jobs.map((job, index) => (
									<div
										key={index + job.id}
										className={`duration-300 ease-in-out mx-auto ${
											isOnline ? "cursor-pointer" : "opacity-90 brightness-95"
										}`}
										onClick={() => handleCardClick(job.id)}
									>
										<JobCard
											id={job.id}
											status={job.status}
											image={job.image}
										/>
									</div>
							  ))
							: !isCreating && (
									<div className="col-span-full m-auto text-xl text-gray-400 font-medium">
										<h1>Empty</h1>
									</div>
							  )}

						{isCreating && <Skeleton />}
					</>
				)}
			</div>
		</div>
	);
};

export default JobsList;
