import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesSliceReducer, { IMoviesReducer } from "../appSlices/movie.slice";

export interface IStore {
  rootReducer: {
    moviesReducer: IMoviesReducer;
  }
}

const rootReducer = combineReducers({
  moviesReducer: moviesSliceReducer
});

export const store = configureStore({
  reducer: {rootReducer}
});

export type AppDispatch = typeof store.dispatch
