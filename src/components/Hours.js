import React from "react";
import './Hours.css'
function Hours({forecastWeatherData}) {
  return (
    <> <h2>Hourly Forecast</h2>
    <div className="hours">
      {forecastWeatherData.forecast.forecastday[0].hour.filter((_,index)=> index%2).map((data) => 
        <div className="hour">
          <p>{data.time.slice(11)}</p>
          <img src={data.condition.icon} alt="weather-condition" />
          {/* <p>{data.condition.text}</p> */}
          <p>{data.temp_c}° 💧{data.chance_of_rain}%</p>
        </div>
      )}
    </div>
    </>
  );
}

export default Hours;
