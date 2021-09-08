import {useState,useEffect} from 'react'
import axios from 'axios'
export default function UseFetch(cityName) {
   const [loading,setLoading] = useState(true)
   const [error,setError] = useState(false)
   const [weatherData,setWeatherData] = useState()
  
  useEffect(()=>{
    setLoading(true)
    setError(false)
    const source = axios.CancelToken.source()
    let authToken = 'mytoken'
    const fetchData =async ()=>{
        try{
            const res=await axios({
                    method : 'GET',
                    Accept:'application/json',
                
                    url : 'https://api.openweathermap.org/data/2.5/weather',
                    params: {q:cityName,appid:authToken}
                })
            const myData = await res.data
                setWeatherData(myData)      
                setLoading(false)
        }catch(err){
            if(axios.isCancel(err)){

            }else{
                setError(true)
            }
        }
        } 
    fetchData()

    return ()=>{
        source.cancel()
    }
        
    },[cityName])

    return {loading,error,weatherData}
}
