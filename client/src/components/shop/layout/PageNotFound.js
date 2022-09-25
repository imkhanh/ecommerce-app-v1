import { Layout } from '..';

const PageNotFoundComponent = () => {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<h1 className="text-gray-400 font-black text-5xl lg:text-3xl md:text-xl uppercase">Page Not Found</h1>
		</div>
	);
};

const PageNotFound = () => {
	return <Layout children={<PageNotFoundComponent />} />;
};

export default PageNotFound;
