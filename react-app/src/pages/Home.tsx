import {  fetchMovies, useAppDispatch } from "appSlices/movie.slice"
import MovieCardList from "components/MovieCardList/MovieCardList"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IStore } from "store/store"

const Home = () =>{
  

  return(
    <>
    <MovieCardList listType='Home' />
    {/* <div className="loadMore" onClick={() => {setPage(page+1)}}>Load more</div>
    {pending ? <div>Loading...</div> : ''} */}
    </>
  )
}

export default Home