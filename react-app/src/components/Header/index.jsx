import styles from './Header.module.scss';
import logo from './pixema-logo.png';
import { HeaderSvgSelector } from './HeaderSvgSelector.jsx';

const Header = ()=>{


  return(
    
    <section className={styles.header}>
      <div className='container'>
        <div className={styles.header__container}>
          <div className={styles.logo}>
            <img src={logo} alt='pixema-logo.png' />
          </div>
          <form className={styles.search__form}>
            <input
              type="text"
              placeholder='Search'
              className={styles.search__input} />
              <div className={styles.filter}>
                <span/>
              </div>
          </form>
          <div className={styles.user__wrap}>
            <div className={styles.user__menu}>
              <div className={styles.user__logo}><HeaderSvgSelector id='user' /></div>
              <span>Sign In</span>
            </div>
            <HeaderSvgSelector id='arrow-right'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header;