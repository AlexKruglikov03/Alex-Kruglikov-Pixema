import styles from '../MovieCardList/MovieCardList.module.scss';
import MovieCard, { IMovie } from 'components/MovieCard/MovieCard';
import { useEffect, useState } from 'react';
import { fetchMovies, useAppDispatch } from 'appSlices/movie.slice';
import { useSelector } from 'react-redux';
import { IStore } from 'store/store';
import { ReactComponent as Spinner } from 'svg/Spinner.svg' 

export interface IMovieCardList{
  listType: string,
}

const MovieCardList: React.FC <IMovieCardList> = ({listType}) => {
  const [endOfPage, setEndOfPage] = useState(false)

  const dispatch = useAppDispatch();
  const {pending ,movies, lastPage} = useSelector((storeState: IStore) => storeState.rootReducer.moviesReducer)

  /*Update page on scroll

  const scrollHandler = (e:Event) =>{
    const target = e.target as HTMLDocument
    if ((target.documentElement.scrollHeight - target.documentElement.scrollTop - window.innerHeight-100<0) && !lastPage) setEndOfPage(!endOfPage)
  }
  useEffect(()=>{
    document.addEventListener('scroll', scrollHandler)

    return ()=>{
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  */

  useEffect(()=>{
    dispatch(fetchMovies({listType}))
  }, [endOfPage])

  return(
    
    <div className={styles.cardList__coontainer}>
      <div className={styles.cardList__wrap}>
        {movies.map((movie => <MovieCard movie={movie} key={movie.id}/>))}
      </div>
      <div className={styles.loadMore} onClick={(e)=>{
        if(!lastPage) setEndOfPage(!endOfPage)
      }}>
        <span>{lastPage ? 'No more films' : 'Show more'}</span>{pending ? <Spinner/> : ''}
      </div>
    </div>
  )
}

export default MovieCardList