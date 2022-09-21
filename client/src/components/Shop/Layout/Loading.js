import React from 'react';
import ReactLoadingComponent from 'react-loading';

const Loading = ({ type, width, height }) => {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
			<ReactLoadingComponent type={type} color="black" height={height} width={width} />
		</div>
	);
};

export default Loading;
