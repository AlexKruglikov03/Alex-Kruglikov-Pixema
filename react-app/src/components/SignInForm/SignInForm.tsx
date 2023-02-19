import styles from './SignInForm.module.scss';
import { FormEventHandler, useEffect, useState } from 'react';
import { useAppDispatch } from 'appSlices/movie.slice';
import { getToken, getUserData } from 'appSlices/user.slice';
import { useSelector } from 'react-redux';
import { IStore } from 'store/store';
import { useLocation } from 'react-router';
import { history } from 'utils/history';

const SignInForm = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { user, token } = useSelector(
		(state: IStore) => state?.rootReducer?.userReducer,
	);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		dispatch(getToken({ email, password }));
	};

	useEffect(() => {
		console.log(token);
		if (token) dispatch(getUserData({ access: token.access }));
	}, [token?.access]);
	useEffect(() => {
		console.log(user);
		if (user) history.replace('/');
	}, [user]);

	return (
		<>
			<form className={styles.signIn__form} onSubmit={handleLogin}>
				<div className={styles.signIn__title}>Sign In</div>
				<div className={styles.signIn__inputs}>
					<div className={styles.signIn__inputs_item}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							value={email}
							id="email"
							placeholder="Your email"
							className={styles.signIn__inputs_input}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.signIn__inputs_item}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							value={password}
							id="password"
							placeholder="Your password"
							className={styles.signIn__inputs_input}
							autoComplete="off"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
				</div>
				<button type="submit" className={styles.signIn__button}>
					Sign in
				</button>
			</form>
		</>
	);
};

export default SignInForm;
