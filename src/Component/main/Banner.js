import React, { useEffect, useState } from 'react'

import'./Banner.css'
import Netflix from "../login/Netflix.svg";
import YouTube from 'react-youtube-embed'
import movieTrailer from 'movie-trailer'
const Main = () => {
 
  const[BannerMovie,setBannerMovie]=useState([])
  const[trailerUrl,setTrailerUrl]=useState("")
  const fetchBannerMovie=async()=>{
    const url='https://api.themoviedb.org/3/trending/movie/day?api_key=5e5a10bf15e4c464ba825901913cba9a&videos?language=en-US'
     const fetchBmovie=await fetch(url)
     const BannerResJson=await fetchBmovie.json()
     return BannerResJson

  }
  useEffect(()=>{
    const FetchingBannerData=async()=>{
      const MovieData=await fetchBannerMovie()
       
        console.log('qqqqqqqq',MovieData)
        const randomIndex = Math.floor(Math.random() * MovieData.results.length-1)
         setBannerMovie(MovieData.results[randomIndex ]);
        console.log('rr',MovieData.results[randomIndex ])
    }
    
    FetchingBannerData();
   
  },[])
  // const firstMovie = BannerMovie[0]
  // console.log(firstMovie)
  
  const handleclick=(BannerMovie)=>{
      movieTrailer(BannerMovie?.title||'')
      .then((url)=>{
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v")); 
      })
      .catch((error) => console.log(error))
      document.querySelector('.Banner').style.display='none'
    
  }
  const handleExitMovie=(BannerMovie)=>{
    if (trailerUrl) {
      setTrailerUrl('')
      document.querySelector('.Banner').style.display='block'
    }
  }
 
  return (
    <div>
    <img src={Netflix}  className='Blogo' alt="" />
   
    {  trailerUrl&&<YouTube id={trailerUrl}   />}
      <img className='Banner'src={`https://image.tmdb.org/t/p/original/${BannerMovie.backdrop_path}`} alt="" />
     

      
      <div className="detail">
     
        <h1> {BannerMovie?.title}</h1>
        <button className='btnp'onClick={()=>handleclick(BannerMovie)}>play</button>
        <button className='btnp 'onClick={()=>handleExitMovie(BannerMovie)}>ExitTrailer</button>
        <p className='movie-Desc'>{BannerMovie.overview}</p>
    
       

      </div>
      <div className="fade_bottom"></div>
      
     
    </div>
  )
}

export default Main
