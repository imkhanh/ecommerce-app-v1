import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';

const PageNotFoundComponent = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<div>
				<h1> PageNotFound</h1>
				<Link to="/">Back to home page</Link>
			</div>
		</div>
	);
};

const PageNotFound = () => {
	return <Layout children={<PageNotFoundComponent />} />;
};

export default PageNotFound;
