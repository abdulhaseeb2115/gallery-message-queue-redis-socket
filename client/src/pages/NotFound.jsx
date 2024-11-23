import { useNavigate } from "react-router-dom";

export const NotFound = () => {
	const navigate = useNavigate();

	/**
	 * Redirect to /
	 */
	const handleBackClick = () => {
		navigate("/");
	};
	return (
		<div className="h-full w-full flex flex-col items-center justify-center">
			<div className="mb-12 text-4xl font-bold text-blue-600 text-center">
				<h1>404</h1>
				<h1>Page Not Found</h1>
			</div>

			<button
				className="h-fit px-2.5 py-1.5 bg-blue-600 text-white font-medium rounded-full hover:scale-95 hover:opacity-90 ease-in-out duration-150"
				onClick={handleBackClick}
			>
				Back to home
			</button>
		</div>
	);
};
