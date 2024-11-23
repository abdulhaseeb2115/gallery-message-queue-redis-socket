const ConnectionBanner = () => {
	return (
		<div className="h-10 w-full bg-yellow-500 text-white text-center flex items-center justify-center">
			<span role="img">⚠️</span>
			<p className="ml-2">
				Oops! You&apos;re offline. 🌐 Please check your internet connection to
				continue using all features.
			</p>
		</div>
	);
};

export default ConnectionBanner;
