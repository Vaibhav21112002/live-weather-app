// ? https://api.openweathermap.org/data/2.5/weather?q=jammu&appid=2ba862c9f5243ef3d3874eb7ae0f2774
import React, { useState, useEffect } from "react";
import "./styles.css";
const Whether = () => {
  const [searchValue, setSearchValue] = useState("delhi");
  const [weatherInfo, setWeatherInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=2ba862c9f5243ef3d3874eb7ae0f2774`;
      const res = await fetch(url);
      const data = await res.json();
      //   console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      var sec = sunset * 1000;
      var date = new Date(sec);
      var timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const myWeather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        timeStr,
      };

      setWeatherInfo(myWeather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });
  return (
    <div style={{ marginTop: "20%" }}>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            className="searchTerm"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          <button
            type="button"
            className="searchButton"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <article className="widget">
        <div className="weatherIcon">
          <i className={"wi wi-day-sunny"}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{weatherInfo.temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">sunny</div>
            <div className="place">{searchValue}, India</div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {weatherInfo.timeStr} <br />
                Sunset
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {weatherInfo.humidity} <br />
                Humidity
              </p>
            </div>
          </div>
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {weatherInfo.pressure} <br />
                Pressure
              </p>
            </div>
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {weatherInfo.speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Whether;
