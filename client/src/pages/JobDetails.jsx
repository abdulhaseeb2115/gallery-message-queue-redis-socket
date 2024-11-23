import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { JOB_STATUS, SOCKET_EVENT_NAME } from "../constants";
import { getJobById } from "../requests";
import { socket } from "../socket";
import handleError from "../utils/errorHandler";
import handleSlowInternet from "../utils/slowInternetHandler";
import { NetworkContext } from "../context/NetworkContext";

const JobsDetails = () => {
	const params = useParams();
	const jobId = params?.id;
	const isOnline = useContext(NetworkContext);
	const [isLoading, setIsLoading] = useState(true);
	const [job, setJob] = useState(null);

	/**
	 * Fetch job by id
	 * Update state with job
	 */
	const fetchJob = async () => {
		try {
			const response = await handleSlowInternet(() => getJobById(jobId));
			setJob(response?.data);
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
				if (jobId == data.id) {
					setJob(data);
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	/**
	 * Fetch job
	 * Refresh on online
	 */
	useEffect(() => {
		if (isOnline && (!jobId || job?.status === JOB_STATUS.pending)) {
			fetchJob();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOnline]);

	return (
		<div className="h-full w-full p-6 overflow-hidden">
			<header className="h-[10%] flex justify-between gap-5">
				<div className="text-lg font-bold uppercase text-blue-600">
					<h1>Calo Task</h1>
				</div>
			</header>

			<div className="h-[90%] overflow-y-auto flex flex-col items-center justify-center gap-5 p-6 bg-gray-100 rounded-xl">
				{isLoading ? (
					<Loader />
				) : (
					<>
						{job ? (
							<div className="w-full max-w-3xl h-full bg-white rounded-xl shadow-lg border border-gray-200 p-6">
								{job.status === JOB_STATUS.resolved && job.image ? (
									<img
										src={job.image}
										alt="job_image"
										className="w-full h-[75%] object-cover rounded-md bg-gray-200"
									/>
								) : (
									<div className="w-full h-[75%] rounded-md bg-gray-200 text-gray-400 flex items-center justify-center">
										<h1>
											{job.status === JOB_STATUS.failed
												? "Failed"
												: "Pending..."}
										</h1>
									</div>
								)}

								<div className="w-full h-[25%] flex items-end gap-5">
									<div className="flex-1 text-center">
										<h6 className="text-sm font-medium italic uppercase">
											Job Id
										</h6>
										<h4 className="text-lg">{job.id}</h4>
									</div>

									<div className="flex-1 text-center">
										<h6 className="text-sm font-medium italic uppercase">
											Status
										</h6>
										<h4 className="capitalize text-lg">{job.status}</h4>
									</div>
								</div>
							</div>
						) : (
							<div className="m-auto text-xl text-gray-400 font-medium">
								<h1>Job Not Found</h1>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default JobsDetails;
