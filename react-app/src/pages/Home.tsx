import FiltersSideBar from 'components/FiltersSideBar/FiltersSideBar';
import MovieCardList from 'components/MovieCardList/MovieCardList';

const Home = () => {
	return (
		<>
			<MovieCardList listType="Home" />
			<FiltersSideBar />
		</>
	);
};

export default Home;
