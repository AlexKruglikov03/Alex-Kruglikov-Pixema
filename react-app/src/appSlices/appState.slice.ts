import { createSlice } from '@reduxjs/toolkit';

export interface IAppStateReducer {
	theme: 'dark' | 'light';
	isFilterSideBarOpen: boolean;
}

const initialState: IAppStateReducer = {
	theme: 'dark',
	isFilterSideBarOpen: false,
};

const appStateSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		switchTheme: (state) => {
			state.theme === 'dark' ? (state.theme = 'light') : (state.theme = 'dark');
		},
		openFilterSideBar: (state) => {
			state.isFilterSideBarOpen = !state.isFilterSideBarOpen;
		},
	},
});

export const { switchTheme, openFilterSideBar } = appStateSlice.actions;
export default appStateSlice.reducer;
