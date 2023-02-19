import { useParams } from 'react-router';
import MovieInfo from 'components/MovieInfo/MovieInfo';

const Movie = () => {
	const { id } = useParams();
	return <>{id ? <MovieInfo id={+id} /> : 'Invalid movie ID'}</>;
};

export default Movie;
