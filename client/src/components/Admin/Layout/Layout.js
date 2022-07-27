import React from 'react';

const Layout = ({ children }) => {
	return (
		<div>
			<div>Side bar</div>
			<div>{children}</div>
		</div>
	);
};

export default Layout;
