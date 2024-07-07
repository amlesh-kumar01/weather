import React from "react";
import "./CurrentLoc.css";
function CurrentLoc({ currentWeatherData, forecastWeatherData }) {
  return (
    <div className="CurrentLoc">
      <div className="current-location">
        <div className="location">
          {currentWeatherData.location.name},{" "}
          {currentWeatherData.location.region} (
          {currentWeatherData.location.country}).
        </div>

        <div className="local-time">
          {currentWeatherData.location.localtime}
        </div>
      </div>

      <div className="current-weather-condition">
        <div className="current-temp">
          <img src={currentWeatherData.current.condition.icon} alt="weather-icon" />
          <div>{currentWeatherData.current.temp_c}</div>
          <span>°C</span>
          <ul className="current-min-max">
            <li>
              {forecastWeatherData.forecast.forecastday[0].day.maxtemp_c}°
            </li>
            <li>
              {forecastWeatherData.forecast.forecastday[0].day.mintemp_c}°
            </li>
          </ul>
        </div>
        <div className="current-condition">
          {currentWeatherData.current.condition.text}
        </div>

        <div className="current-other">
          <ul>
            <li>Feels Like : {currentWeatherData.current.feelslike_c}</li>
            <li>Humidity : {currentWeatherData.current.humidity}%</li>
            <li>Wind Direction : {currentWeatherData.current.wind_dir}</li>
            <li>Wind Speed : {currentWeatherData.current.wind_kph} km/h</li>
            <li>Pressure : {currentWeatherData.current.pressure_mb}mb</li>
            <li>UV index : {currentWeatherData.current.uv}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CurrentLoc;
