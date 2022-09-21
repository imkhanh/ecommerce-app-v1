const ProductSkeleton = ({ count }) => {
	return (
		<>
			{Array(count)
				.fill(1)
				.map((_, index) => (
					<div key={index} className="p-6 relative bg-white animate-pulse border-r border-b border-black/10">
						<div className="w-full h-[280px] bg-slate-100"></div>
						<div className="pt-3">
							<div className="mb-2 h-4 bg-slate-100"></div>
							<div className="h-3 bg-slate-100"></div>
						</div>
					</div>
				))}
		</>
	);
};

export default ProductSkeleton;
