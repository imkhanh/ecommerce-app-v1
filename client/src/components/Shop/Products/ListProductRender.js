import Loading from '../Layout/Loading';

const ListProductRender = ({ count }) => {
	return (
		<>
			{Array(count)
				.fill(1)
				.map((_, index) => (
					<div key={index} className="p-6 relative bg-white select-none border-b border-r border-black/10 animate-pulse">
						<div className="w-full h-[280px]">
							<Loading type="spin" width={22} height={22} />
						</div>
						<div className="pt-3">
							<div className="mb-2 h-4"></div>
							<div className="h-2"></div>
						</div>
					</div>
				))}
		</>
	);
};

export default ListProductRender;
