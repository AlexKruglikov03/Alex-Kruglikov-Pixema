import {
	Route,
	Routes,
	unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { history } from 'utils/history';
import PageLayout from 'pages/PageLayout';
import Home from 'pages/Home';
import Movie from 'pages/Movie';
import SignIn from 'pages/SignIn';

const Router = () => {
	return (
		<HistoryRouter history={history}>
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/" element={<PageLayout />}>
					<Route index element={<Home />} />
					<Route path="movie/:id" element={<Movie />} />
					<Route path="*" element={<Home />} />
				</Route>
			</Routes>
		</HistoryRouter>
	);
};

export default Router;
