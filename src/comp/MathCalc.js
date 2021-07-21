export const kelvinToCelcius = (temp)=>{
    let a =temp - 273.15
    let b = a.toPrecision(2)
    return b
}



export const secondsToTime = (secondsTime,timezone)=>{
    let a = (secondsTime * 1000) + (timezone*1000)
    let timePeriod = 'AM'
  
    let hour =new Date(a).getUTCHours() 
   
    let minute = new Date(a).getUTCMinutes() 
   
    if(hour > 12){
        hour= hour-12
        timePeriod = 'PM'
      }else{
          timePeriod = 'AM'
      }
      if(minute > 60){
          hour = hour + 1
          minute = minute - 60
      }else if(minute < 10){
          minute = '0' + minute
      }

      
    return hour.toString() + ' : ' + minute.toString() + ' ' + timePeriod
}

export const windSpeedAndDirection =(windSpeed,windDirection)=>{
    let a = (windSpeed * 3600)/1000
    let b = a.toPrecision(2) 
    let windDirectionArr = ['N','NNE',"NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
    let c = windDirection/22.5 
    if(c > 9){c = c.toPrecision(2)}else{c = c.toPrecision(1)}
    let d = windDirectionArr[c]
    return b.toString() + ' km/h ' + d
}

export const todayDate = (secondsTime,timezone)=>{
    let a =(secondsTime * 1000) + (timezone*1000)
    let monthArr = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let b = new Date(a).getUTCMonth()  
    let monthName = monthArr[b]
    let c = new Date(a).getUTCFullYear()    
    let e =new Date(a).getUTCDate() 
    return monthName + ' ' + e + ','+c
    
}

export const dayNamecheck = (secondsTime,timezone)=>{
    let a =(secondsTime * 1000) + (timezone*1000)
    let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let c = new Date(a).getUTCDay()
    let dayName = dayArr[c]
   return dayName
}