import { ReactComponent as HomePage } from 'svg/HomePage.svg';
import { ReactComponent as Trends } from 'svg/Trends.svg';
import { ReactComponent as Favorites } from 'svg/Favorites.svg';
import styles from './Navigation.module.scss';

const Navigation = () => {
	return (
		<section className={styles.navigation}>
			<ul className={styles.navigation__wrap}>
				<li>
					<HomePage /> Home
				</li>
				<li>
					<Trends /> Trends
				</li>
				<li>
					<Favorites /> Favorites
				</li>
			</ul>
			<div className={styles.footer}>©Alex Kruglikov Pixema</div>
		</section>
	);
};

export default Navigation;
