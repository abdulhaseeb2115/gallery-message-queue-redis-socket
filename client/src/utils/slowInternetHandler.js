import { toast } from "react-hot-toast";
import { SLOW_REQUEST_DELAY } from "../constants";

/**
 * Show a "slow internet" toast
 */

const handleSlowInternet = async (action) => {
	const timeoutId = setTimeout(() => {
		toast("🚀 Loading... Good things take time!", { id: "slow-internet" });
	}, SLOW_REQUEST_DELAY);
	const response = await action();
	clearTimeout(timeoutId);
	return response;
};

export default handleSlowInternet;
