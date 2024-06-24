import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userData, weather, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
      <div className="container-fluid px-4">
        <span className="navbar-brand mb-0 h1 hlink">Welcome back {userData.name}</span>
        {weather && (
          <>
            <span className="navbar-text">Location: {weather.name}</span>
            <span className="navbar-text">Temperature: {Math.round(weather.main.temp - 273.15)}°C</span>
            <span className="navbar-text">
              Weather: {weather.weather[0].description}{" "}
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
                style={{ width: "24px", height: "24px" }}
              />
            </span>
          </>
        )}
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
