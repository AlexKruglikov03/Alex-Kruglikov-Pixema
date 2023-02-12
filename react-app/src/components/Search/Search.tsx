import { useAppDispatch } from 'appSlices/movie.slice';
import { useSearchParams } from 'react-router-dom';
import styles from '../Search/Search.module.scss';
import { clearStore } from 'appSlices/movie.slice';
import { useDebounce } from 'utils/utils';
import { useCallback, useEffect, useState } from 'react';

interface ISearchProps {
	className: string;
	placeholder: string;
	filters: boolean;
}

const Search: React.FC<Partial<ISearchProps>> = ({
	className = '',
	placeholder = 'Search',
	filters = true,
}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [query, setQuery] = useState(searchParams.get('title') ?? '');
	const dispatch = useAppDispatch();

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		setQuery(target.value);
	};

	const updateStore = (query: string) => {
		if (query !== searchParams.get('title')) {
			dispatch(clearStore());
			setSearchParams({ title: query });
		}
	};
	const debouncedUpdateStore = useCallback(useDebounce(updateStore, 500), []);

	useEffect(() => {
		debouncedUpdateStore(query);
	}, [query]);

	return (
		<form
			className={[
				`${styles.search__form}`,
				...className.split(' ').map((cn) => `${styles[cn]}`),
			].join(' ')}
		>
			<input
				type="text"
				placeholder={placeholder}
				className={styles.search__input}
				onChange={onChangeHandler}
				value={query}
			/>

			{filters && (
				<div className={styles.filter}>
					<span />
				</div>
			)}
		</form>
	);
};

export default Search;
