import React, { useState } from "react";
import "./Header.css";

function Header({ setCity, savedLocs, setSavedLocs }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setCity(inputValue);
  };

  const handleAdd = () => {
    if (inputValue && !savedLocs.includes(inputValue)) {
      setSavedLocs([...savedLocs, inputValue]);
      setInputValue(""); // Clear input after adding
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
        <a href="#">Login</a>
      </div>
      <div className="saved-location">
        {savedLocs.map((locs) => (
          <button key={locs} onClick={() => setCity(locs)}>
            {locs}
          </button>
        ))}
      </div>
    </>
  );
}

export default Header;
