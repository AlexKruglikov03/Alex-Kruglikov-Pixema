import { Link } from 'react-router-dom';
import { ReactComponent as User } from 'svg/User.svg';
import { ReactComponent as ArrowRight } from 'svg/Arrow-right.svg';
import Search from 'components/Search/Search';
import logo from 'pixema-logo.png';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { IStore } from 'store/store';

const Header = () => {
	const { username, id } =
		useSelector(
			(storeState: IStore) => storeState.rootReducer.userReducer.user,
		) ?? {};

	return (
		<section className={styles.header}>
			<div className={styles.header__container}>
				<div className={styles.logo}>
					<img src={logo} alt="Pixema logo" />
				</div>
				<Search className="search__header" />
				<div className={styles.user__wrap}>
					<div className={styles.user__menu}>
						<div className={styles.user__logo}>
							<User />
						</div>
						{username ? (
							<Link to={`../user/${id}`}>{username}</Link>
						) : (
							<Link to="../signin">Sign In</Link>
						)}
					</div>
					<ArrowRight />
				</div>
			</div>
		</section>
	);
};

export default Header;
