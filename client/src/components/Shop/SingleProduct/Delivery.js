import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const DeliverySection = () => {
	const [delivery, setDelivery] = useState(false);

	return (
		<div className="py-6 border-t border-gray-300">
			<div onClick={() => setDelivery(!delivery)} className="flex items-center justify-between">
				<h4 className="cursor-pointer text-lg text-black select-none">Free Delivery and Returns</h4>
				<span className="cursor-pointer select-none">{delivery ? <BsChevronUp /> : <BsChevronDown />}</span>
			</div>
			{delivery && (
				<div className="mt-8 text-sm text-black/70 space-y-8">
					<p>Your order of 5.000.000₫ or more gets free standard delivery.</p>
					<ul className="pl-4 list-disc">
						<li>Standard delivered 4-5 Business Days</li>
						<li>Express delivered 2-4 Business Days</li>
					</ul>
					<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>
					<p>
						Ambition Members enjoy <span className="text-black font-medium cursor-pointer">free returns.</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default DeliverySection;
