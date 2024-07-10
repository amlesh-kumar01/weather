import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { addLocation, removeLocation } from "../requests/LocationRequest";

import axios from "axios";
const API_BASE_URL = "http://localhost:5000/users";

function Header({
  setCity,
  savedLocs,
  setSavedLocs,
  currentLoc,
  savedLocsWeather,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setCity(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAdd = async () => {
    if (inputValue && !savedLocs.includes(inputValue)) {
      const addLocMsg = await addLocation(inputValue);
      console.log(addLocMsg);
      await getAllLocations();
      // setSavedLocs([...savedLocs, inputValue]);
      setInputValue(""); // Clear input after adding
    }
  };

  const getAllLocations = async () => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      const response = await axios.get(`${API_BASE_URL}/getlocs/${userInfo}`);
      setSavedLocs([...response.data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (locationName) => {
    const deleteLocMsg = await removeLocation(locationName);
    console.log(deleteLocMsg);
    await getAllLocations();
  };

  return (
    <>
      <div className="Header">
        <div className="heading">
          <img src="/images/header/logo.png" alt="header-logo" />
          <span className="header-title">Weather</span>
        </div>
        <div className="loc-head">
          <input
            type="text"
            className="loc-input"
            placeholder="Enter Location"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="loc-search" onClick={handleSearch}>
            <img src="/images/header/search-icon.svg" alt="search-icon" />
          </button>
          <button className="add-loc" onClick={handleAdd}>
            Add
          </button>
        </div>
        {localStorage.getItem("loggedIn") ? (
          <Link to="/user">{localStorage.getItem("username")}</Link>
        ) : (
          <Link to="/login">Login/Signup</Link>
        )}
      </div>
      <div className="saved-location-container">
        <div className="saved-location">
          <button
            className="location-btn current-loc"
            onClick={() => setCity(currentLoc)}
          >
            {currentLoc}
          </button>
          {savedLocs.map((locObject, index) => (
            <div className="savedLocs" key={index}>
              <button
                className="location-btn saved-loc"
                onClick={() => setCity(locObject.name)}
              >
                <p>{locObject.name} </p>
                {savedLocs.length == savedLocsWeather.length && (
                  <>
                    <p>{savedLocsWeather[index].current.temp_c}°</p>
                    <p>{savedLocsWeather[index].current.condition.text}</p>
                  </>
                )}
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(locObject.name)}
              >
                <img
                  src="/images/delete.png"
                  alt="delete-icon"
                  className="delete-icon"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
