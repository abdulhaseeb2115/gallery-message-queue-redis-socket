import { toast } from "react-hot-toast";

/**
 * Show a "slow internet" toast
 */

let timeoutId;
const handleSlowInternet = async (action) => {
	try {
		timeoutId = setTimeout(() => {
			toast("🚀 Loading... Good things take time!", { id: "slow-internet" });
		}, 3000);
		const response = await action();
		return response;
	} finally {
		clearTimeout(timeoutId);
	}
};

export default handleSlowInternet;
