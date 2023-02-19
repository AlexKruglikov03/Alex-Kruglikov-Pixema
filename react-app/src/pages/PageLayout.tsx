import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/Navigation';
import FiltersSideBar from 'components/FiltersSideBar/FiltersSideBar';

const PageLayout = () => {
	return (
		<>
			<Header />
			<div className="centre">
				<Navigation />
				<div className="content">
					<Outlet />
				</div>
			</div>
			<FiltersSideBar />
		</>
	);
};

export default PageLayout;
