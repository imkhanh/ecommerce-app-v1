import ReactLoading from 'react-loading';

const Loading = () => {
	return (
		<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<ReactLoading type="spinningBubbles" color="black" width={45} />
		</div>
	);
};

export default Loading;
