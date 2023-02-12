import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from 'components/MovieCard/MovieCard';
import { IMovieCardList } from 'components/MovieCardList/MovieCardList';
import { stat } from 'fs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

interface IRange {
	from: number;
	to: number;
}

interface IMoviesQueryParamsBase {
	sort: string;
	title: string;
	genres: string[];
	years: Partial<IRange>;
	rating: Partial<IRange>;
	country: string;
}

export type IMoviesQueryParams = Partial<IMoviesQueryParamsBase>;

export interface IMoviesReducer {
	movies: IMovie[];
	pending: boolean;
	nextPage: number;
	lastPage: boolean;

	queries: IMoviesQueryParams;
}

const compareObjects = (obj1: Object, obj2: Object) => [
	JSON.stringify(obj1) === JSON.stringify(obj2),
	obj1,
	obj2,
];

// export const fetchMovie = createAsyncThunk(
//   'movies/MovieId', //   type/payload
//   async(movieId, thunkAPI) => {
//       try{
//         console.log("movies");
//         const response = await fetch(`http://localhost:3000/movies`)

//         if(response.ok===false){
//           throw new Error("Server Error")
//         }

//         const json = await response.json()
//         console.log(json);

//         return json as IMovie[]
//       }
//       catch{
//         return thunkAPI.rejectWithValue(["error.message"])
//       }
//   }
// );

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
		}: { listType: string; queries?: IMoviesQueryParams; page?: number },
		thunkAPI,
	) => {
		try {
			console.log('movies');
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
						}${genres?.map(
							(genre) => '&genre_like=(:?^|,)' + genre + '(:?$|,)',
						)}`,
					);
			}

			if (response.ok === false) {
				throw new Error('Server Error');
			}

			const json = await response.json();

			return json as IMovie[];
		} catch {
			return thunkAPI.rejectWithValue(['error.message']);
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

const moviesSlice = createSlice({
	name: 'movies',
	initialState,

	reducers: {
		setMovies: (state, action: PayloadAction<IMovie[]>) => {},
	},

	extraReducers: (builder) => {
		// builder.addCase(fetchMovie.fulfilled, (state, action) => {
		//   console.log(action.payload)
		//   state.movies = action.payload
		// });
		// builder.addCase(fetchMovie.pending, (state, action) => {
		//   console.log("PENDING")
		//   state.movies = []
		// });
		// builder.addCase(fetchMovie.rejected, (state, action) => {
		//   console.log('ERROR 11')
		//   state.movies = []
		// });
		builder.addCase(fetchMovies.pending, (state, action) => {
			console.log('PENDING');
			console.log(state.movies);

			// if (
			// 	action.meta.arg.queries &&
			// 	!compareObjects(state.queries, action.meta.arg.queries)
			// ) {
			// 	state.nextPage = 1;
			// }
			return {
				...state,
				pending: true,
				movies: state.nextPage === 1 ? [] : [...state.movies],
			};
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			return {
				...state,
				pending: false,
				queries: action.meta.arg.queries ?? state.queries,
				movies: [...state.movies, ...action.payload],
				nextPage: action.payload.length ? state.nextPage + 1 : state.nextPage,
				lastPage: !action.payload.length,
			};
		});
		builder.addCase(fetchMovies.rejected, (state, action) => {
			console.log('ERROR 11');
			return { ...state, movies: [] };
		});
		builder.addCase(clearStore.pending, (state, action) => {
			return {
				...state,
				nextPage: 1,
				movies: [],
			};
		});
	},
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
