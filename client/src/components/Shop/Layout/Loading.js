import ReactLoading from 'react-loading';

const Loading = () => {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
			<ReactLoading type="spinningBubbless" color="black" height="40" width="40" />
		</div>
	);
};

export default Loading;
