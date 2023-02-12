import styles from '../MovieCardList/MovieCardList.module.scss';
import MovieCard, { IMovie } from 'components/MovieCard/MovieCard';
import { useCallback, useEffect, useState } from 'react';
import {
	fetchMovies,
	IMoviesQueryParams,
	useAppDispatch,
} from 'appSlices/movie.slice';
import { useSelector } from 'react-redux';
import { IStore } from 'store/store';
import { ReactComponent as Spinner } from 'svg/Spinner.svg';
import { Link, useParams, useSearchParams } from 'react-router-dom';

export interface IMovieCardList {
	listType: string;
}

const MovieCardList: React.FC<IMovieCardList> = ({ listType }) => {
	const [searchParams] = useSearchParams();

	const [endOfPage, setEndOfPage] = useState(false);
	const [, updateState] = useState({});
	const forceUpdate = useCallback(() => updateState({}), []);

	const dispatch = useAppDispatch();
	const {
		pending,
		movies,
		lastPage,
		nextPage: page,
	} = useSelector((storeState: IStore) => storeState.rootReducer.moviesReducer);
	const [moviesList, setMoviesList] = useState(movies);

	/*Update page on scroll

  const scrollHandler = (e:Event) =>{
    const target = e.target as HTMLDocument
    if ((target.documentElement.scrollHeight - target.documentElement.scrollTop - window.innerHeight-100<0) && !lastPage) setEndOfPage(!endOfPage)
  }
  useEffect(()=>{
    document.addEventListener('scroll', scrollHandler)

    return ()=>{
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  */

	useEffect(() => {
		const params = Object.fromEntries(searchParams.entries());
		let queries: IMoviesQueryParams = {
			...params,
			genres: params?.genres?.split(',') ?? [],
			years: {
				from: +params.year_from || 0,
				to: +params.year_to || Infinity,
			},
			rating: {
				from: +params.rating_from || 0,
				to: +params.rating_to || 10,
			},
		};
		dispatch(
			fetchMovies({
				listType,
				queries,
				page,
			}),
		);
	}, [endOfPage, searchParams]);

	useEffect(() => {
		setMoviesList(movies);
	}, [movies]);
	useEffect(() => {
		forceUpdate();
		console.log('Movies after """rerender""": ', movies);
	}, [moviesList]);

	return (
		<div className={styles.cardList__coontainer}>
			<div className={styles.cardList__wrap}>
				{movies.map((movie) => (
					<MovieCard movie={movie} key={movie.id} />
				))}
			</div>
			<div
				className={styles.loadMore}
				onClick={(e) => {
					if (!lastPage) setEndOfPage(!endOfPage);
				}}
			>
				<span>{lastPage ? 'No more films' : 'Show more'}</span>
				{pending ? <Spinner /> : ''}
			</div>
		</div>
	);
};

export default MovieCardList;
