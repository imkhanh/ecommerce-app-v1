import React from 'react';

const Featured = () => {
	return (
		<div className="px-8 lg:px-4 py-12">
			<div className="mb-8">
				<h1 className="text-2xl md:text-xl font-bold">Featured</h1>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-1 gap-4">
				<div
					className="relative h-[800px] md:h-[500px]"
					style={{
						backgroundImage:
							'url(https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_786,c_limit/b5beaf15-b78d-4f0d-970f-13476148758c/nike-just-do-it.png)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className="absolute inset-0 bg-black opacity-20" />
					<div className="absolute bottom-8 left-8 space-y-4 z-10">
						<div className="flex flex-col space-y-1">
							<h4 className="text-white  text-sm">Men's New Releases</h4>
							<p className="text-white text-lg font-medium">Meet the New You</p>
						</div>
						<div>
							<span className="px-4 py-2 bg-white text-black font-medium text-sm rounded-full hover:bg-black hover:text-white cursor-pointer">
								Shop
							</span>
						</div>
					</div>
				</div>
				<div
					className="relative h-[800px] md:h-[500px]"
					style={{
						backgroundImage:
							'url(https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_786,c_limit/818f88bd-4e70-4fd3-86a8-4f16d947dce2/nike-just-do-it.png)',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<div className="absolute inset-0 bg-black opacity-20" />
					<div className="absolute bottom-8 left-8 space-y-4 z-10">
						<div className="flex flex-col space-y-1">
							<h4 className="text-white  text-sm">Women's New Releases</h4>
							<p className="text-white text-lg font-medium">Fresh pick for You</p>
						</div>
						<div>
							<span className="px-4 py-2 bg-white text-black font-medium text-sm rounded-full hover:bg-black hover:text-white cursor-pointer">
								Shop
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Featured;
