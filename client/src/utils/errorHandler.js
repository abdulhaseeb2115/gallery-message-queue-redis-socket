import { toast } from "react-hot-toast";

/**
 * Get error
 * Displays appropriate toast messages
 * Log error
 */
const handleError = (error, defaultMessage = "Something went wrong") => {
	if (error?.message === "Network Error") {
		toast("🚨 Network issue. Check your connection.", { id: "network-error" });
	} else if (error?.response?.status === 404) {
		toast("🚨 Resource not found.", { id: "not-found" });
	} else {
		toast(`🚨 ${defaultMessage}`, { id: "general-error" });
	}
	console.log("{Error}:", error);
};

export default handleError;
