import {
	MouseEventHandler,
	ChangeEvent,
	useState,
	useEffect,
	ChangeEventHandler,
} from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IStore } from 'store/store';
import { openFilterSideBar } from 'appSlices/appState.slice';
import { clearStore, fetchMovies, useAppDispatch } from 'appSlices/movie.slice';
import { compareArrays, toggleArrayValue } from 'utils/utils';
import Search from 'components/Search/Search';
import styles from './FiltersSideBar.module.scss';

const FiltersSideBar = () => {
	const genres = [
		'Action',
		'Advinture',
		'Crime',
		'Drama',
		'Thriller',
		'Comedy',
		'Fantasy',
		'Mystery',
		'Fiction',
	];
	const countries = ['United States', 'China', 'United Kingdom'];

	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useAppDispatch();

	const { listType, queries } = useSelector(
		(storeState: IStore) => storeState.rootReducer.moviesReducer,
	);

	const [selectedGenres, setSelectedGenres] = useState(queries.genres ?? []);
	const { isFilterSideBarOpen } = useSelector(
		(storeState: IStore) => storeState.rootReducer.appStateReducer,
	);

	// const [inputValues, setInputValuses] = useState({
	// 	year_form: searchParams.get('year_from') ?? '',
	// 	year_to: searchParams.get('year_to') ?? '',
	// 	rating_from: searchParams.get('rating_from') ?? '',
	// 	rating_to: searchParams.get('rating_to') ?? '',
	// });

	// const useInputOnChangeEventHandler_1 = (param: keyof typeof inputValues) => {
	// 	return (e: ChangeEvent) => {
	// 		const { value } = e.target as HTMLInputElement;
	// 		if (value !== inputValues[param]) {
	// 			setInputValuses({ ...inputValues, [param]: value });
	// 		}
	// 	};
	// };

	// useEffect(() => {
	// 	dispatch(clearStore());
	// 	for (const key in inputValues) {
	// 		const param = key as keyof typeof inputValues;
	// 		if (inputValues[param]) {
	// 			searchParams.set(param, inputValues[param]);
	// 		} else searchParams.delete(param);
	// 	}
	// 	setSearchParams(searchParams);
	// }, [inputValues]);

	const useInputOnChangeEventHandler = (param: string) => {
		// should be debounced but i have no time
		return (e: ChangeEvent) => {
			const { value } = e.target as HTMLInputElement;
			if (value !== searchParams.get(param)) {
				dispatch(clearStore());
				if (value) {
					searchParams.set(param, value);
				} else searchParams.delete(param);
				setSearchParams(searchParams);
			}
		};
	};
	const closeOnClickEventHandler = () => {
		dispatch(openFilterSideBar());
	};

	const sortOnClickEventHandler: MouseEventHandler<HTMLDivElement> = (e) => {
		const { innerText: value } = e.target as HTMLElement;
		const sort = value === 'Rating' ? 'IMDB' : value.toLowerCase();
		dispatch(clearStore());
		dispatch(
			fetchMovies({
				listType: listType ?? 'home',
				queries: { ...queries, sort },
			}),
		);
	};
	const genreOnChangeEventHandler: ChangeEventHandler<HTMLInputElement> = (
		e,
	) => {
		const { value } = e.target as HTMLInputElement;
		setSelectedGenres(toggleArrayValue(selectedGenres, value));
	};

	const clearFiltersEventHandler = () => {
		if ([...searchParams.entries()].length) {
			dispatch(clearStore());
			setSearchParams(new URLSearchParams());
		}
	};

	useEffect(() => {
		if (queries.genres && !compareArrays(queries.genres, selectedGenres)) {
			console.debug(queries.genres, selectedGenres);
			console.debug(!compareArrays(queries.genres, selectedGenres));
			setSelectedGenres(queries.genres);
		}
	}, [queries.genres]);
	useEffect(() => {
		const value = selectedGenres.join(',');
		if (value !== searchParams.get('genres')) {
			dispatch(clearStore());
			if (value) {
				searchParams.set('genres', value);
			} else searchParams.delete('genres');
			setSearchParams(searchParams);
		}
	}, [selectedGenres]);

	return (
		<div
			className={`${styles.filters__wrap} ${
				isFilterSideBarOpen && styles.filters__wrap_open
			}`}
		>
			<div className={styles.filters__title}>
				<span>Filters</span>
				<span
					className={styles.filters__close}
					onClick={closeOnClickEventHandler}
				>
					✕
				</span>
			</div>
			<div className={styles.filters__list}>
				<div className={styles.filters__sort}>
					<span>Sort by</span>
					<div className={styles.filters__sort__wrap}>
						<div
							className={[
								styles.filters__sort__rating,
								queries.sort === 'IMDB'
									? styles.filters__sort__item_active
									: '',
							].join(' ')}
							onClick={sortOnClickEventHandler}
						>
							Rating
						</div>
						<div
							className={[
								styles.filters__sort__year,
								queries.sort === 'year'
									? styles.filters__sort__item_active
									: '',
							].join(' ')}
							onClick={sortOnClickEventHandler}
						>
							Year
						</div>
					</div>
				</div>
				<div className={styles.filters__items}>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>
							Full or sort movie name
						</div>
						<Search
							className="search__form__filters"
							filters={false}
							placeholder="Your text"
						/>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>Genre</div>
						<div className={styles.filters__genres__wrap}>
							{genres.map((genre) => (
								<div key={genre} className={styles.filters__genre}>
									<label
										htmlFor={genre}
										className={[
											styles.filters__genre__label,
											selectedGenres.includes(genre)
												? styles.filters__genre__label_active
												: '',
										].join(' ')}
									>
										{genre}
									</label>
									<input
										className={styles.filters__genre__item}
										checked={selectedGenres.includes(genre)}
										onChange={genreOnChangeEventHandler}
										type="checkbox"
										id={genre}
										value={genre}
									/>
								</div>
							))}
						</div>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>Years</div>
						<div className={styles.filters__item__wrap}>
							<input
								type="number"
								placeholder="From"
								name="yFrom"
								id="yFrorm"
								autoComplete="off"
								min={1950}
								max={2050}
								onChange={useInputOnChangeEventHandler('year_from')}
								value={searchParams.get('year_from') ?? ''}
							/>
							<input
								type="number"
								placeholder="To"
								name="yTo"
								id="yTo"
								autoComplete="off"
								min={1950}
								max={2050}
								onChange={useInputOnChangeEventHandler('year_to')}
								value={searchParams.get('year_to') ?? ''}
							/>
						</div>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>Rating</div>
						<div className={styles.filters__item__wrap}>
							<input
								type="number"
								placeholder="From"
								name="rFrom"
								id="rFrorm"
								autoComplete="off"
								min={0}
								max={10}
								onChange={useInputOnChangeEventHandler('rating_from')}
								value={searchParams.get('rating_from') ?? ''}
							/>
							<input
								type="number"
								placeholder="To"
								name="rTo"
								id="rTo"
								autoComplete="off"
								min={0}
								max={10}
								onChange={useInputOnChangeEventHandler('rating_to')}
								value={searchParams.get('rating_to') ?? ''}
							/>
						</div>
					</div>
					<div className={styles.filters__item}>
						<div className={styles.filters__item__title}>Country</div>
						<select
							name="country"
							id="country"
							onChange={useInputOnChangeEventHandler('country')}
							value={searchParams.get('country') ?? ''}
						>
							{countries.map((country) => (
								<option key={country.replace(/\s/g, '')} value={country}>
									{country}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className={styles.filters__button}>
				<button
					className={styles.filters__button__clear}
					onClick={clearFiltersEventHandler}
				>
					Clear filter
				</button>
				<button className={styles.filters__button__submit}>Show results</button>
			</div>
		</div>
	);
};

export default FiltersSideBar;
