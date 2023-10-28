import React, { useEffect, useState } from 'react'
import './List.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'


const List = ({title,fetchUrl}) => {
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };
  const [mList,setMList]=useState([])
  const[trailerUrl2,setTrailerUrl2]=useState("")
  const imgUrl='https://image.tmdb.org/t/p/original'
  const baseUrl='https://api.themoviedb.org/3'

  const  fetchMovie = async()=>{
    const url=`${baseUrl}${fetchUrl}`
     const response= await fetch(url)
     const resjson=await response.json()
    
    return resjson
    }
  useEffect(()=>{
   const Fetching=async()=>{
   const  Fmovie =await fetchMovie()
  
   setMList (Fmovie.results)
   console.log('jjjjjj',Fmovie)
   }
   Fetching()
  },[])

  const handleClickSingleMovie=(movie)=>{
    console.log('clik')
    if(trailerUrl2){
      setTrailerUrl2('')
  }

    else{
      movieTrailer(movie?.title||'')
      .then((url)=>{
        const urlParams2 = new URLSearchParams(new URL(url).search);
        setTrailerUrl2(urlParams2.get("v")); 
      })
      .catch((error) => console.log(error))
     
    }
  }
 
  return (<>
    <h4 >{title}</h4>
<Carousel responsive={responsive}>

      {mList.map((movie)=>{
            return(
              <>
            <div key={movie.id}className="movieContainer"> 
            <img src={`${imgUrl}/${movie.poster_path}`}onClick={()=>handleClickSingleMovie(movie)} className='imagecard'alt="" />
            </div> 
           
            </> )
           
     })}
    
  </Carousel> 
  {trailerUrl2&&<YouTube videoId={trailerUrl2} opts={opts}/>} 
  </>
   
  )
}

export default List
