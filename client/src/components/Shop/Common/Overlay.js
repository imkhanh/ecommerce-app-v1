const Overlay = (props) => {
	const { state, dispatch } = props;

	return (
		<div
			className={`${state ? '' : 'hidden'} fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm z-50`}
			onClick={dispatch}
		/>
	);
};

export default Overlay;
