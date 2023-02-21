import { ReactComponent as HomePage } from 'svg/HomePage.svg';
import { ReactComponent as Trends } from 'svg/Trends.svg';
import { ReactComponent as Favorites } from 'svg/Favorites.svg';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<section className={styles.navigation}>
			<ul className={styles.navigation__wrap}>
				<li>
					<Link to="../">
						<HomePage /> Home
					</Link>
				</li>
				<li>
					<Link to="#">
						<Trends /> Trends
					</Link>
				</li>
				<li>
					<Link to="#">
						<Favorites /> Favorites
					</Link>
				</li>
			</ul>
			<div className={styles.footer}>Alex Kruglikov © Pixema</div>
		</section>
	);
};

export default Navigation;
