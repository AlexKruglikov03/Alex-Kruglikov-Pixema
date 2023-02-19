import { combineReducers, configureStore } from '@reduxjs/toolkit';
import moviesReducer, { IMoviesReducer } from 'appSlices/movie.slice';
import appStateReducer, { IAppStateReducer } from 'appSlices/appState.slice';
import userReducer, { IUserReducer } from 'appSlices/user.slice';

interface IRootReducer {
	moviesReducer: IMoviesReducer;
	appStateReducer: IAppStateReducer;
	userReducer: IUserReducer;
}

export interface IStore {
	rootReducer: IRootReducer;
}

const rootReducer = combineReducers({
	moviesReducer,
	appStateReducer,
	userReducer,
});

export const store = configureStore({
	reducer: { rootReducer },
});

export type AppDispatch = typeof store.dispatch;
