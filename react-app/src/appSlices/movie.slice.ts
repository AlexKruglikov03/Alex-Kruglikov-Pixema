import { useDispatch } from 'react-redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/store';
import { IMovie } from 'components/MovieCard/MovieCard';

import { history } from 'utils/history';
import { useLocation } from 'react-router';

interface IRange {
	from: number;
	to: number;
}

interface IMovieQueryParamsBase {
	sort: string;
	title: string;
	genres: string[];
	years: Partial<IRange>;
	rating: Partial<IRange>;
	country: string;
}

export type IMovieQueryParams = Partial<IMovieQueryParamsBase>;

export interface IMoviesReducer {
	movies: IMovie[];
	pending: boolean;
	nextPage: number;
	lastPage: boolean;
	listType?: string;
	queries: IMovieQueryParams;
}

interface IFetchMoviesOptions {
	listType: string;
	queries?: IMovieQueryParams;
	page?: number;
}
interface IFetchMovieOptions {
	id: number;
}

export const fetchMovies = createAsyncThunk(
	'movies/MoviesList', //   type/payload
	async (
		{
			listType,
			queries: { sort, title, genres, rating, years, country } = {
				sort: 'year',
				genres: [],
			},
			page = 1,
		}: IFetchMoviesOptions,
		{ rejectWithValue },
	) => {
		try {
			let response;
			switch (listType) {
				case 'Favorites':
					response = await fetch(
						`http://localhost:3000/movies?_limit=10&_page=${page}`,
					);
					break;
				default:
					response = await fetch(
						`http://localhost:3000/movies?_limit=10&_order=desc&_page=${page}&_sort=${sort}&IMDB_gte=${
							rating?.from ?? 0
						}&IMDB_lte=${rating?.to ?? 10}&year_gte=${
							years?.from ?? 0
						}&year_lte=${years?.to ?? Infinity}&title_like=${title ?? ''}${
							country ? '&country_like=(:?^|,)' + country + '(:?$|,)' : ''
						}${genres
							?.map((genre) => '&genre_like=(:?^|,)' + genre + '(:?$|,)')
							.join('')}`,
					);
			}
			if (!response.ok) {
				throw new Error('Server Error');
			}

			const json = (await response.json()) as IMovie[];
			return json;
		} catch {
			return rejectWithValue(['error.message']);
		}
	},
);
export const fetchMovie = createAsyncThunk(
	'movie/Movie', //   type/payload
	async ({ id }: IFetchMovieOptions, { rejectWithValue }) => {
		try {
			let response = await fetch(`http://localhost:3000/movies/${id}`);
			if (!response.ok) throw new Error('Server Error');

			const json = (await response.json()) as IMovie;
			return json;
		} catch {
			return rejectWithValue(['error.message']);
		}
	},
);
export const clearStore = createAsyncThunk(
	'store/clearStore', //   type/payload
	async () => {},
);

const initialState: IMoviesReducer = {
	movies: [],
	pending: true,
	nextPage: 1,
	lastPage: false,

	queries: {
		sort: 'year',
		genres: [],
	},
};

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(
			fetchMovies.pending,
			(
				state,
				{
					meta: {
						arg: { queries, listType },
					},
				},
			) => {
				if (/^\/movie\//i.test(globalThis.location.pathname))
					history.replace('/');
				return {
					...state,
					queries: { ...state.queries, ...queries },
					listType,
					pending: true,
					movies: state.nextPage === 1 ? [] : [...state.movies],
				};
			},
		);
		builder.addCase(
			fetchMovies.fulfilled,
			(
				state,
				{
					payload,
					meta: {
						arg: { queries },
					},
				},
			) => {
				return {
					...state,
					pending: false,
					queries: queries ?? state.queries,
					movies: [...state.movies, ...payload],
					nextPage: payload.length ? state.nextPage + 1 : state.nextPage,
					lastPage: !payload.length,
				};
			},
		);
		builder.addCase(fetchMovies.rejected, () => {
			throw 'Invalid request';
		});
		builder.addCase(fetchMovie.pending, (state) => {
			clearStore();
			return {
				...state,
				pending: true,
			};
		});
		builder.addCase(fetchMovie.fulfilled, (state, { payload }) => {
			return {
				...state,
				pending: false,
				movies: [payload],
			};
		});
		builder.addCase(fetchMovie.rejected, () => {
			throw 'Invalid movie uID';
		});
		builder.addCase(clearStore.pending, (state) => {
			return {
				...state,
				nextPage: 1,
				movies: [],
			};
		});
	},
});

export default movieSlice.reducer;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
