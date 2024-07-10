import React, { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "./data/weatherapi";
import { getLocation } from "./data/locationapi";
import Header from "./components/Header";
import CurrentLoc from "./components/CurrentLoc";
import Days from "./components/Days";
import Hours from "./components/Hours";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DailyWeather from "./components/DailyWeather";
import ErrorMessage from "./components/ErrorMessage";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import axios from 'axios'
import User from "./Pages/User";

function App() {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState(null);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Delhi");
  const [currentLoc, setCurrentLoc] = useState("Current Location");
  const [userStatus, setUserStatus]= useState(true);

  const [savedLocs, setSavedLocs] = useState([]);
  const [savedLocsWeather, setSavedLocsWeather] = useState([]);
  const API_BASE_URL = 'https://weather-backend-amleshkumar01.onrender.com'||"http://localhost:5000/users";

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

  useEffect(() => {
    const getAllLocations = async () => {
      try {
        const userInfo = localStorage.getItem("userInfo");
        const response = await axios.get(`${API_BASE_URL}/getlocs/${userInfo}`);
        setSavedLocs([...response.data]);
      } catch (error) {
        setSavedLocs([]);
        console.log(error.message);
      }
    };
    getAllLocations();
  // eslint-disable-next-line
  }, [userStatus]);



  useEffect(()=>{
    const fetchSavedLocsData = async () => {
      try {
        let arr=[];
        for (let i = 0; i < savedLocs.length; i++) {
          const wd= await getWeatherData(
            savedLocs[i].name,
            "/current.json"
          );
          arr.push(wd);
        }
        setSavedLocsWeather(arr);
        console.log(savedLocsWeather)
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSavedLocsData();
    // eslint-disable-next-line
  },[savedLocs]);

  

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
                  {(<Header
                    city={city}
                    setCity={setCity}
                    savedLocs={savedLocs}
                    setSavedLocs={setSavedLocs}
                    currentLoc={currentLoc}
                    savedLocsWeather={savedLocsWeather}
                  />)}
                  

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
                  <DailyWeather dailyWeatherData={dailyWeatherData} />
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  <Login setUserStatus ={setUserStatus}/>
                </>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element ={<User setUserStatus ={setUserStatus}/>}/>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
