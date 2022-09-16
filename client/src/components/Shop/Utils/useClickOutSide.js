import { useEffect, useRef, useState } from 'react';

const useClickOutSide = () => {
	const divRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleClick = (e) => {
			if (divRef.current && !divRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('click', handleClick, true);
		return () => window.removeEventListener('click', handleClick, true);
	}, []);

	return { divRef, isVisible, setIsVisible };
};

export default useClickOutSide;
