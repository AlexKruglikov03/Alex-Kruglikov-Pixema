import { useAppDispatch } from 'appSlices/movie.slice';
import Search from 'components/Search/Search';
import { useSearchParams } from 'react-router-dom';
import styles from './FiltersSideBar.module.scss';

const FiltersSideBar = () => {
	const genres = ['Crime', 'Action', 'Drama'];
	const countries = ['United States', 'China', 'United Kingdom'];

	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();

	return (
		<div className={styles.filters__wrap}>
			<div className={styles.filters__title}>
				<span>Filters</span>
				<span>✕</span>
			</div>
			<div className={styles.filters__list}>
				<div className={styles.filters__sort}>
					<div>Sort by</div>
					<div className={styles.filters__sort__wrap}>
						<span>Rating</span>
						<span>Year</span>
					</div>
				</div>
				<div className={styles.filters__items}>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>
							Full or sort movie name
						</div>
						<Search
							className="search__filters"
							filters={false}
							placeholder="Your text"
						/>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>Genre</div>
						<div className={styles.filters__genres__wrap}>
							{genres.map((genre) => (
								<div key={genre} className={styles.filters__genre}>
									<label htmlFor={genre}>{genre}</label>
									<input type="checkbox" id={genre} />
								</div>
							))}
						</div>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filtes__item__title}>Years</div>
						<div className={styles.filters__item__wrap}>
							<input type="text" name="yFrom" id="yFrorm" />
							<input type="text" name="yTo" id="yTo" />
						</div>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filtes__item__title}>Rating</div>
						<div className={styles.filters__item__wrap}>
							<input type="text" name="rFrom" id="rFrorm" />
							<input type="text" name="rTo" id="rTo" />
						</div>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filtes__item__title}>Country</div>
						<select name="country" id="country">
							{countries.map((country) => (
								<option key={country.replace(/\s/g, '')} value={country}>
									{country}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FiltersSideBar;
