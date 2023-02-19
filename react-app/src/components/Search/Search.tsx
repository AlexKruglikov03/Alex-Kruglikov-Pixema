import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { openFilterSideBar } from 'appSlices/appState.slice';
import { useAppDispatch, clearStore } from 'appSlices/movie.slice';
import { useDebounce } from 'utils/utils';
import styles from './Search.module.scss';

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

	const openFiltersSideBarOnClickEventHandler = () => {
		dispatch(openFilterSideBar());
	};

	const updateStore = (query: string) => {
		if (query !== (searchParams.get('title') ?? '')) {
			dispatch(clearStore());
			if (!query) {
				searchParams.delete('title');
			} else searchParams.set('title', query);
			setSearchParams(searchParams);
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
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input
				type="text"
				placeholder={placeholder}
				className={styles.search__input}
				onChange={onChangeHandler}
				value={query}
			/>

			{filters && (
				<div
					className={styles.filter}
					onClick={openFiltersSideBarOnClickEventHandler}
				>
					<span />
				</div>
			)}
		</form>
	);
};

export default Search;
