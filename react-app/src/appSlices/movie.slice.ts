import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from 'components/MovieCard/MovieCard';
import { IMovieCardList } from 'components/MovieCardList/MovieCardList';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

export interface IMoviesReducer {
  movies: IMovie[],
  pending: boolean,
  page: number,
  lastPage: boolean
}

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
  async({listType, page = 1}: {listType: string, page?: number}, thunkAPI) => {
      try{
        console.log("movies")
        let response;

        switch (listType) {
          case 'Favorites':
            response = await fetch(`http://localhost:3000/movies?_limit=10&_page=${page}`);
            break;
          default:
            response = await fetch(`http://localhost:3000/movies?_limit=10&_page=${page}`);
        }

        if(response.ok===false){
          throw new Error("Server Error")
        }

        const json = await response.json()

        return json as IMovie[]
      }
      catch{
        return thunkAPI.rejectWithValue(["error.message"])
      }
  }
);

const initialState: IMoviesReducer = {
  movies: [],
  pending: true,
  page: 1,
  lastPage: false
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,

  reducers:{
    setMovies: (state, action: PayloadAction<IMovie[]>) => {}
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
      console.log("PENDING")
      state.pending = true
      action.meta.arg.page = state.page
      if(state.page === 1){
        state.movies = []
      }
      if(!state.lastPage) {
        state.page += 1
      }
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      console.log(action.payload)
      if(action.payload.length) {
        state.movies = [...state.movies, ...action.payload]
      } else {
        state.lastPage = true
      }
      state.pending = false
    }); 
    builder.addCase(fetchMovies.rejected, (state, action) => {
      console.log('ERROR 11')
      state.movies = []
    });
  }
});

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer; 

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

