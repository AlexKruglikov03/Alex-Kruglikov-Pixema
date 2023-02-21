import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IStore } from 'store/store';
import {
	clearStore,
	fetchMovies,
	IMovieQueryParams,
	useAppDispatch,
} from 'appSlices/movie.slice';
import { ReactComponent as Spinner } from 'svg/Spinner.svg';
import MovieCard from 'components/MovieCard/MovieCard';
import styles from './MovieCardList.module.scss';

export interface IMovieCardList {
	listType: string;
}

const MovieCardList: React.FC<IMovieCardList> = ({ listType }) => {
	const [searchParams] = useSearchParams();

	const [endOfPage, setEndOfPage] = useState(false);

	const dispatch = useAppDispatch();
	const {
		pending,
		movies,
		lastPage,
		nextPage: page,
		queries: { sort },
	} = useSelector((storeState: IStore) => storeState.rootReducer.moviesReducer);

	/* ==Update page on scroll==

  const scrollHandler = (e:Event) =>{
    const target = e.target as Document
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
		const {
			title,
			country,
			genres,
			year_from,
			year_to,
			rating_from,
			rating_to,
		} = Object.fromEntries(searchParams.entries());

		let queries: IMovieQueryParams = {
			title,
			country,
			genres: genres?.split(',') ?? [],
			years: {
				from: +year_from || 0,
				to: +year_to || Infinity,
			},
			rating: {
				from: +rating_from || 0,
				to: +rating_to || 10,
			},
			sort,
		};
		dispatch(
			fetchMovies({
				listType,
				queries,
				page,
			}),
		);
	}, [endOfPage, searchParams]);

	useEffect(
		() => () => {
			dispatch(clearStore());
		},
		[],
	);

	return (
		<div className={styles.cardList__coontainer}>
			<div className={styles.cardList__wrap}>
				{movies.map((movie) => (
					<MovieCard movie={movie} key={movie.id} />
				))}
			</div>
			<div
				className={styles.loadMore}
				onClick={() => {
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
