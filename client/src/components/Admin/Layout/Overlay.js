const Overlay = (props) => {
	const { state, dispatch } = props;

	return (
		<div
			className={`${state ? '' : 'hidden'} fixed inset-0 bg-black opacity-70 w-full h-full z-50`}
			onClick={dispatch}
		/>
	);
};

export default Overlay;
