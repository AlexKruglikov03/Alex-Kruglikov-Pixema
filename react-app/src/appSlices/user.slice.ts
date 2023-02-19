import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IAccessToken {
	access: string;
}
interface IRefreshToken {
	refresh: string;
}
interface IToken extends IAccessToken, IRefreshToken {}

interface IUser {
	username: string;
	email: string;
	id: number;
}

export interface IUserReducer {
	token: IToken | null;
	user: IUser | null;
}

interface IGetTokenOptions {
	email: string;
	password: string;
}

const initialState: IUserReducer = {
	token: null,
	user: null,
};

export const getToken = createAsyncThunk(
	'user/getToken',
	async ({ email, password }: IGetTokenOptions, thunkAPI) => {
		try {
			const response = await fetch(
				`https://studapi.teachmeskills.by/auth/jwt/create/`,
				{
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ email, password }),
				},
			);

			if (!response.ok) {
				throw new Error('Server Error');
			}

			const json = (await response.json()) as IToken;
			return json;
		} catch {
			return thunkAPI.rejectWithValue(['Authentification error']);
		}
	},
);

export const refreshToken = createAsyncThunk(
	'user/getToken',
	async ({ refresh }: IRefreshToken, thunkAPI) => {
		try {
			const response = await fetch(
				`https://studapi.teachmeskills.by/auth/jwt/refresh/`,
				{
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify({ refresh }),
				},
			);

			if (!response.ok) {
				throw new Error('Server Error');
			}

			const json = (await response.json()) as IAccessToken;
			return json;
		} catch {
			return thunkAPI.rejectWithValue(['Authentification error']);
		}
	},
);

export const getUserData = createAsyncThunk(
	'user/userLogin',
	async ({ access }: IAccessToken, thunkAPI) => {
		try {
			const response = await fetch(
				`https://studapi.teachmeskills.by/auth/users/me/`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${access}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error('Server Error');
			}

			const json = (await response.json()) as IUser;
			return json;
		} catch {
			return thunkAPI.rejectWithValue(['Authentification error']);
		}
	},
);

const userSlice = createSlice({
	name: 'user',
	initialState,

	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(getToken.fulfilled, (state, action) => {
			return {
				...state,
				token: action.payload,
			};
		});
		builder.addCase(getToken.rejected, (state, action) => {
			return {
				...state,
				token: null,
			};
		});
		builder.addCase(getUserData.fulfilled, (state, { payload: user }) => {
			return {
				...state,
				user,
			};
		});
		builder.addCase(getUserData.rejected, (state) => {
			return {
				...state,
				user: null,
			};
		});
		// builder.addCase(
		// 	refreshToken.fulfilled,
		// 	(state, { payload: { access } }) => {
		// 		const token = { access, refresh: state.token?.refresh ?? '' };
		// 		return {
		// 			...state,
		// 			token,
		// 		};
		// 	},
		// );
		// builder.addCase(refreshToken.rejected, (state, action) => {
		// 	return {
		// 		...state,
		// 		token: null,
		// 	};
		// });
	},
});

export default userSlice.reducer;
