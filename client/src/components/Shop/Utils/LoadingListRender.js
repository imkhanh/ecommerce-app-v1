import Loading from './Loading';

const LoadingListRender = ({ count }) => {
	return (
		<>
			{Array(count)
				.fill(1)
				.map((_, index) => {
					return (
						<div key={index} className="p-6 relative flex flex-col w-full h-full bg-white select-none border-r border-b border-black/10">
							<div className='flex-1 overflow-hidden"'>
								<div className="w-full h-[280px] md:h-full">
									<Loading />
								</div>
							</div>
							<div className="pt-3"></div>
						</div>
					);
				})}
		</>
	);
};

export default LoadingListRender;
