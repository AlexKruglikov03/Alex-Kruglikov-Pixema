import styles from './MovieCard.module.scss';

export interface IMovie {
	id: number;
	title: string;
	genre: string[];
	IMDB: number;
	length: string;
	discription: string;
	year: number;
	released: string;
	boxOffice: string;
	country: string[];
	poduction: string[];
	actors: string[];
	director: string;
	writers: string[];
	img: string;
}

interface IMovieCard {
	movie: IMovie;
	key?: string | number;
}

const MovieCard: React.FC<IMovieCard> = ({
	movie: { title, genre, IMDB, img },
}) => {
	return (
		<div className={styles.card__wrap}>
			<div className={styles.card__img}>
				<img src={img} alt={`«${title}» poster`} />
				<div
					className={`${styles.card__rating} ${
						IMDB <= 7.5
							? IMDB <= 5
								? styles.card__rating_orange
								: styles.card__rating_yellow
							: ''
					}`}
				>
					{IMDB.toFixed(1)}
				</div>
			</div>
			<div className={styles.card__discription}>
				<span className={styles.card__title}>{title}</span>
				<span className={styles.card__genre}>
					{genre.map((genre, index) => (
						<span className={styles.card__genre__item} key={genre}>
							{index ? ' • ' : ''}
							{genre}
						</span>
					))}
				</span>
			</div>
		</div>
	);
};

export default MovieCard;
