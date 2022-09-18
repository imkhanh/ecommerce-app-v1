import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import useClickOutSide from '../Utils/useClickOutSide';

const Delivery = () => {
	const { divRef, isVisible, setIsVisible } = useClickOutSide();

	return (
		<div ref={divRef} className="py-5">
			<div onClick={() => setIsVisible(!isVisible)} className="flex items-center justify-between cursor-pointer select-none">
				<span className="text-lg font-medium">Free Delivery and Returns</span>
				<span>{isVisible ? <BsChevronUp /> : <BsChevronDown />}</span>
			</div>
			{isVisible && (
				<div className="pt-6 text-black font-light space-y-8">
					<p>Your order of 5.000.000₫ or more gets free standard delivery.</p>
					<ul className="pl-4 list-disc">
						<li>Express delivered 2-4 Business Days</li>
						<li>Standard delivered 4-5 Business Days</li>
					</ul>
					<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>
					<p>Nike Members enjoy free returns.</p>
				</div>
			)}
		</div>
	);
};

export default Delivery;
