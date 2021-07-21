import React,{useState,useEffect} from 'react'
import '../css/Home.scss'
import UseFetch from './UseFetch'
import { BiSearchAlt } from "react-icons/bi";

import {secondsToTime,windSpeedAndDirection,kelvinToCelcius,todayDate,dayNamecheck} from './MathCalc'
import { FiSun} from "react-icons/fi";
import { IoThunderstorm} from "react-icons/io5";
import {IoRainyOutline} from 'react-icons/io5'
import {WiDayCloudy,WiCloudy,WiFog} from "react-icons/wi";
import {GiSunrise,GiSunset,GiWindsock } from "react-icons/gi";
import { GiSnowing } from "react-icons/gi";

export default function Home() {
  const [mainWeather,setMainWeather] = useState()
 const [sunTime,setSunTime] = useState({
     sys: {},
     timezone : {}
 })
 const [wind,setWind] = useState()
 const [weatherCondition,setWeatherCondition] = useState()
 const [persentDate,setPersentDate] =  useState()
 const [cityName,setCityName] = useState('')
 const [city,setCity] =useState('delhi')

const {sys,timezone} = sunTime

const {loading,error,weatherData} = UseFetch(city)


useEffect(()=>{
    
   if(!loading){
       setMainWeather(weatherData.main)
       setSunTime({
           sys : weatherData.sys,
           timezone : weatherData.timezone
       })
       setWind(weatherData.wind)
       setWeatherCondition(weatherData.weather[0])
       setPersentDate(weatherData.dt)
   }
   
},[loading,weatherData,error])
///////////////////////////////////////////////////////////////////   
const iconSet = ()=>{
    let a = weatherCondition.main
    let b = weatherCondition.description
    if(a === 'Clouds'){
        return <WiCloudy />
    }else if(a === 'Thunderstorm'){
        return <IoThunderstorm />
    }else if(a === 'Rain'){
        return <IoRainyOutline />
    }else if(a === 'Mist'){
        return <WiFog />
    }else if(a === 'Clear'){
        return <FiSun />
    }else if(a === 'Snow'){
           return <GiSnowing />
    }else if(a === 'Clouds' && b === 'few clouds'){
        return <WiDayCloudy />
    }else{
        return <WiFog />
    }
} 


 const cityNameInput = e=>{
     setCityName(e.target.value)
 }
  const onSubmit =()=>{
      //e.preventDefault()
    setCity(cityName)
  }


    return (
        <div className='homeContainer'>
           
            <div className="upperbody">
                <div className="content">
                    <div className="cityAndDate">
                        <div className="city"><h4>{!error? (city) : ('not Found')}</h4></div>
                        <div className="date"><h2>{persentDate ? (todayDate(persentDate,timezone)) : ('Today')}</h2></div>
                    </div>
                    <div className="tmpFeel">
                        <div className="iconshow">
                           {weatherCondition ? (iconSet()) : ('-')}
                        </div>                    
                        <div className="teempfeel">
                           <div className="temperature"><h1>{mainWeather ? (kelvinToCelcius(mainWeather.temp)) : ('-')} </h1><span>&#8451;</span></div>
                           <div className="feeling"><h4>{weatherCondition ? (weatherCondition.description) : ('-')}</h4></div>
                        </div>
                        <div className="dayname"><h3>{persentDate ? (dayNamecheck(persentDate,timezone)) : ('-')}</h3></div>
                    </div>
                </div>            
            </div>    

            <div className="lowerbody">
                <div className="moreDetails">
                    <div className="sunrise">
                        <p>Sunrise</p>
                        <div className="timeandicon">
                            <GiSunrise />
                            <h5>{sunTime ? (secondsToTime(sys.sunrise,timezone)) : ('-')}</h5>
                        </div>                      
                    </div>
                    <div className="wind">
                        <div className="timeandiconn">
                           <GiWindsock />
                           <p>Wind</p>
                        </div>
                        <h5>{wind ? (windSpeedAndDirection(wind.speed,wind.deg)) : ('-')}</h5>     
                    </div>
                    <div className="sunset">
                        <p>Sunset</p>
                        <div className="timeandicon">
                           <GiSunset />
                           <h5>{sunTime ? (secondsToTime(sys.sunset,timezone)) : ('-')}</h5>
                        </div>
                         
                    </div>
                 </div>
                <div className="moreInfo">
                    <div className="feelsLike">
                        <h4>Feels Like <span>{mainWeather ? (kelvinToCelcius(mainWeather.feels_like)) : ('-')} &#8451; </span></h4>
                    </div>
                    <div className="SearchCity">   
                    {/* <form action="" onSubmit={e=>onSubmit(e)} >
                    <input onChange={cityNameInput} spellCheck="false"  className='searchInput' type="text" placeholder='Search city' />
                       <BiSearchAlt type='submit' className='searchBtn'  />
                       </form>  */}
                       <input onChange={cityNameInput} spellCheck="false"  className='searchInput' type="text" placeholder='Search city' />
                       <BiSearchAlt type='submit' className='searchBtn' onClick={onSubmit} />
                    </div>
                </div>             
            </div>

        </div>
    )
}
