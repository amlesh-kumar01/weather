import React from 'react'
import './Days.css'
import {Link } from 'react-router-dom'
function Days({forecastWeatherData, setDailyWeatherData, dailyWeatherData}) {
  return (
    <>
    <h2>Daily Forecast</h2>
    <div className="days">
      
      {forecastWeatherData.forecast.forecastday.map((data,index) => 
        <Link to='/dailyWeather' className="day"  onClick={()=>{setDailyWeatherData(data)}} key={index}  >
          <p>{data.date.slice(5)}</p>
          <img src={data.day.condition.icon} alt="weather-condition" />
          {/* <p>{data.condition.text}</p> */}
          <p>{data.day.maxtemp_c}°/{data.day.mintemp_c}° </p>
          <p>💧{data.day.daily_chance_of_rain}%</p>
        </Link>
      )}
    </div>
    </>
  )
}

export default Days;