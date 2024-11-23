import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { JOB_STATUS } from "../constants/index";

const JobCard = ({ id, status, image }) => {
	const navigate = useNavigate();
	/**
	 * Redirect to /job/{id}
	 */
	const handleCardClick = () => {
		navigate(`/job/${id}`);
	};

	return (
		<div
			className="w-72 h-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4"
			onClick={handleCardClick}
			role="button"
		>
			{status === JOB_STATUS.resolved && image ? (
				<img
					src={image}
					alt="job_image"
					className="w-full h-[75%] object-cover rounded-md bg-gray-200"
				/>
			) : (
				<div className="w-full h-[75%] rounded-md bg-gray-200 text-gray-400 flex items-center justify-center">
					<h1>{status === JOB_STATUS.failed ? "Failed" : "Pending..."}</h1>
				</div>
			)}

			<div className="w-full h-[25%] flex items-end gap-5">
				<div className="flex-1 text-center">
					<h6 className="text-xs font-medium italic uppercase">Job Id</h6>
					<h4>{id}</h4>
				</div>

				<div className="flex-1 text-center">
					<h6 className="text-xs font-medium italic uppercase">Status</h6>
					<h4 className="capitalize">{status}</h4>
				</div>
			</div>
		</div>
	);
};

JobCard.propTypes = {
	id: PropTypes.number.isRequired,
	status: PropTypes.string.isRequired,
	image: PropTypes.string,
};

export default JobCard;
