import React from "react";
import "./DailyWeather.css";

function DailyWeather({ dailyWeatherData }) {
  return (
    <>
      {dailyWeatherData && (
        <div className="DailyWeather">
          <div className="dwd-main">
            <div className="dwd-date">{dailyWeatherData.date}</div>
            <div className="dwd-condition-icon">
              <img src={dailyWeatherData.day.condition.icon} alt="condition" />
            </div>
            <div className="dwd-temp">
              {dailyWeatherData.day.maxtemp_c}° /{" "}
              {dailyWeatherData.day.mintemp_c}°
            </div>
            <div className="dwd-condition-text">
              {dailyWeatherData.day.condition.text}
            </div>

            <ul>
              <li>Humidity : {dailyWeatherData.day.avghumidity}%</li>
              <li>
                Precipitation: {dailyWeatherData.day.daily_chance_of_rain}%
              </li>
            </ul>
          </div>

          <h2>Hourly Forecast</h2>
          <div className="dwd-hours">
            {dailyWeatherData.hour
              .filter((_, index) => index % 2)
              .map((data, index) => (
                <div className="dwd-hour" key={index}>
                  <p>{data.time.slice(11)}</p>
                  <img src={data.condition.icon} alt="weather-condition" />
                  <p>
                    {data.temp_c}° 💧{data.chance_of_rain}%
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DailyWeather;
