import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-black">
			<div className="container flex items-center justify-between">
				<div className="w-full flex items-center md:flex-col">
					<div className="text-white uppercase text-xs font-light">@2022 onedayonething</div>
					<div className="ml-10 h-12 px-4 space-x-4 text-white uppercase text-xs font-light flex items-center border-x border-white">
						<div>terms of use</div>
						<div>privacy policy</div>
						<div>help</div>
					</div>
				</div>
				<div className="h-12 md:hidden flex items-center justify-end pl-4 border-l border-white text-white uppercase text-xs font-light">instagram</div>
			</div>
		</footer>
	);
};

export default Footer;
