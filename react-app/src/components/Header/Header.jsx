import styles from './Header.module.scss';
import logo from '../../pixema-logo.png';

import { ReactComponent as User } from 'svg/User.svg';
import { ReactComponent as ArrowRight } from 'svg/Arrow-right.svg';
import Search from 'components/Search/Search';

const Header = () => {
	return (
		<section className={styles.header}>
			<div className={styles.header__container}>
				<div className={styles.logo}>
					<img src={logo} alt="pixema-logo.png" />
				</div>
				<Search className="search__header" />
				<div className={styles.user__wrap}>
					<div className={styles.user__menu}>
						<div className={styles.user__logo}>
							<User />
						</div>
						<span>Sign In</span>
					</div>
					<ArrowRight />
				</div>
			</div>
		</section>
	);
};

export default Header;
