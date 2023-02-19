import SignInForm from 'components/SignInForm/SignInForm';
import styles from './SignIn.module.scss';

const SignIn = () => {
	return (
		<div className={styles.signIn__wrap}>
			<SignInForm />
		</div>
	);
};

export default SignIn;
