import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IStore } from 'store/store';
import { fetchMovie, useAppDispatch } from 'appSlices/movie.slice';
import { ReactComponent as Spinner } from 'svg/Spinner.svg';
import { ReactComponent as IMBDLogo } from 'svg/Imdb.svg';
import styles from 'components/MovieCard/MovieCard.module.scss';

interface MovieInfoProps {
	id: number;
}

const MovieInfo: FC<MovieInfoProps> = ({ id }) => {
	const dispatch = useAppDispatch();
	const { pending, movies } = useSelector(
		(storeState: IStore) => storeState.rootReducer.moviesReducer,
	);
	const { user } = useSelector(
		(storeState: IStore) => storeState.rootReducer.userReducer,
	);
	const {
		title,
		genre,
		IMDB,
		length,
		discription,
		year,
		released,
		boxOffice,
		country,
		poduction,
		actors,
		director,
		writers,
		img,
	} = movies.at(0) ?? {};
	useEffect(() => {
		dispatch(
			fetchMovie({
				id,
			}),
		);
	}, [id]);

	return (
		<>
			{pending ? (
				<Spinner />
			) : (
				(
					<div className={styles.info__wrap}>
						<div className={[styles.section, styles.section_left].join(' ')}>
							<div className={styles.card__img}>
								<img src={img} alt={`«${title}» poster`} />
							</div>
							<div className={styles.side__buttons}>
								{user && (
									<div className={styles.side__button}>Add to favorites</div>
								)}
							</div>
						</div>
						<div className={[styles.section, styles.section_right].join(' ')}>
							<div className={styles.card__genre}>
								{genre?.map((genre, index) => (
									<span className={styles.genre__item} key={genre}>
										{index ? ' • ' : ''}
										{genre}
									</span>
								))}
							</div>
							<h3 className={styles.title}>{title}</h3>
							<div className={styles.stats}>
								<span
									className={`${styles.card__rating} ${
										(IMDB ?? 10) <= 7.5
											? (IMDB ?? 10) <= 5
												? styles.card__rating_orange
												: styles.card__rating_yellow
											: ''
									}`}
								>
									{IMDB?.toFixed(1)}
								</span>
								<span className={styles.stats__item}>
									<IMBDLogo />
									{IMDB}
								</span>
								<span className={styles.stats__item}>{length}</span>
							</div>
							<div>{discription}</div>
							<div className={styles.meta}>
								<div className={styles.meta__item} title="Year">
									{year}
								</div>
								<div className={styles.meta__item} title="Released">
									{released}
								</div>
								<div className={styles.meta__item} title="BoxOffice">
									{boxOffice}
								</div>
								<div className={styles.meta__item} title="Country">
									{country?.join(', ')}
								</div>
								<div className={styles.meta__item} title="Poduction">
									{poduction}
								</div>
								<div className={styles.meta__item} title="Actors">
									{actors?.join(', ')}
								</div>
								<div className={styles.meta__item} title="Director">
									{director}
								</div>
								<div className={styles.meta__item} title="Writers">
									{writers?.join(', ')}
								</div>
							</div>
						</div>
					</div>
				) ?? 'oopsie~!'
			)}
		</>
	);
};

export default MovieInfo;
