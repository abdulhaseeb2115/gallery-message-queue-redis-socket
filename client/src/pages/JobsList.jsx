import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import Skeleton from "../components/Skeleton";
import { SOCKET_EVENT_NAME } from "../constants";
import { createJob, getJobs } from "../requests";
import socket from "../socket";

const JobsList = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isCreating, setIsCreating] = useState(false);
	const [jobs, setJobs] = useState([]);

	/**
	 * Create a new job
	 * Update state with new job
	 */
	const handleAddJobClick = async () => {
		try {
			setIsCreating(true);
			const response = await createJob();
			setJobs((prev) => [...prev, response?.data]);
		} catch (error) {
			toast.error("Something went wrong");
			console.log("ERROR(Add Job):");
			console.log(error);
		} finally {
			setIsCreating(false);
		}
	};

	/**
	 * Fetch all jobs
	 * Update state with jobs
	 */
	const fetchJobs = async () => {
		try {
			setIsLoading(true);
			const response = await getJobs();
			setJobs(response?.data);
		} catch (error) {
			toast.error("Something went wrong");
			console.log("ERROR(Get Jobs):");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Fetch jobs
	 * Subscribe to jobCompleted event
	 * UnSubscribe on unmount
	 */
	useEffect(() => {
		fetchJobs();

		socket.on(SOCKET_EVENT_NAME, (data) => {
			setJobs((prevJobs) =>
				prevJobs.map((job) =>
					job.id === data.id
						? { ...job, status: data?.status, image: data?.image }
						: job
				)
			);
		});

		return () => {
			socket.off(SOCKET_EVENT_NAME);
		};
	}, []);

	return (
		<div className="h-full w-full p-6 overflow-hidden">
			<header className="h-[10%] flex justify-between gap-5">
				<div className="text-lg font-bold uppercase text-blue-600">
					<h1>Calo Task</h1>
				</div>

				<button
					className="h-fit px-2.5 py-1.5 bg-blue-600 text-white font-medium rounded-full hover:scale-95 hover:opacity-90 ease-in-out duration-150 disabled:bg-gray-400 disabled:!scale-100 disabled:!opacity-100 disabled:cursor-default"
					disabled={isLoading || isCreating}
					onClick={handleAddJobClick}
				>
					Create Job +
				</button>
			</header>

			<div className="h-[90%] overflow-y-auto flex flex-wrap gap-5 p-4 bg-gray-100 rounded-xl">
				{isLoading ? (
					<Loader />
				) : (
					<>
						{jobs?.length > 0 ? (
							jobs.map((job, index) => (
								<JobCard
									key={index + job.id}
									id={job.id}
									status={job.status}
									image={job.image}
								/>
							))
						) : (
							<div className="m-auto text-xl text-gray-400 font-medium">
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
