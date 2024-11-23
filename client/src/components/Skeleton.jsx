const Skeleton = () => {
	return (
		<div className="mx-auto w-72 h-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-pulse">
			<div className="w-full h-[70%] bg-gray-200 rounded-lg" />
			<div className="w-full h-[30%] flex items-end gap-5 pt-4">
				<div className="h-full flex-1 bg-gray-200 rounded-lg" />
				<div className="h-full flex-1 bg-gray-200 rounded-lg" />
			</div>
		</div>
	);
};

export default Skeleton;
