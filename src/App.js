import React, { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "./data/weatherapi";
import { getLocation } from "./data/locationapi";
import Header from "./components/Header";
import CurrentLoc from "./components/CurrentLoc";
import Days from "./components/Days";
import Hours from "./components/Hours";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DailyWeather from "./components/DailyWeather";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [currentLoc, setCurrentLoc] = useState("Current Location");
  const [savedLocs, setSavedLocs] = useState([]);

  // Function to fetch location using IP address
  const fetchLocation = async () => {
    try {
      setCity((await getLocation()).city);
      setCurrentLoc((await getLocation()).city);
    } catch (error) {
      setError(error.message);
      console.log("Error in fetching location data:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    setSavedLocs([currentLoc]);
  }, [currentLoc]);

  // Function to fetch data from weatherapi.js
  const fetchData = async (city) => {
    try {
      let apiMethod = "/current.json";
      setCurrentWeatherData(await getWeatherData(city, apiMethod));
      apiMethod = "/forecast.json";
      setForecastWeatherData(await getWeatherData(city, apiMethod));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (city) {
      fetchData(city);
    }
  }, [city]);


 

 

  return (
    <div className="App">
{error ? (
        <ErrorMessage message={error} />
      ) : (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  city={city}
                  setCity={setCity}
                  savedLocs={savedLocs}
                  setSavedLocs={setSavedLocs}
                />

                {currentWeatherData && forecastWeatherData && (
                  <>
                    <CurrentLoc
                      currentWeatherData={currentWeatherData}
                      forecastWeatherData={forecastWeatherData}
                    />

                    <Hours forecastWeatherData={forecastWeatherData} />
                    <Days
                      forecastWeatherData={forecastWeatherData}
                      setDailyWeatherData={setDailyWeatherData}
                      dailyWeatherData={dailyWeatherData}
                    />
                    <p></p>
                    
                  </>
                )}
              </>
            }
          />

          <Route
            path="/dailyWeather"
            element={
              <>
                <DailyWeather dailyWeatherData={dailyWeatherData}/>
              </>
            }
          />
        </Routes>
      </Router>)}
    </div>
  );
}

export default App;
