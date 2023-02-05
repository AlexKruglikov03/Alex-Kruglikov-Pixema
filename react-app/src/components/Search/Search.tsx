import styles from '../Search/Search.module.scss';

const Search = ()=>{


  return(
    <form className={styles.search__form}>
            <input
              type="text"
              placeholder='Search'
              className={styles.search__input} />
              <div className={styles.filter}>
                <span/>
              </div>
          </form>
  )
}

export default Search