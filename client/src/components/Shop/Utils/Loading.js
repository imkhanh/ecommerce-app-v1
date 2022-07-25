import Spinner from '../../../Spinner.gif';

const Loading = () => {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<img src={Spinner} alt="loading" className="w-32" />
		</div>
	);
};

export default Loading;
