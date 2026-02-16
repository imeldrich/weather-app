import React from 'react';
import logo from "./assets/logo.png"
const apiKey = import.meta.env.VITE_API_KEY;

function App() {

  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState("")

  async function getWeather() {
    if (city === "") {
      alert("Enter a city")
    } else {
      const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const weatherData = await weather.json();
      setWeather(weatherData)
    }
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="app">
      <div className='weather-logo'>
        <img src={logo} alt="weather logo" className='weather-img'/>
        <h1 className='weather-text'>Weather App</h1>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter a city' onChange={handleChange} value={city} className='input'/>
          <button onClick={getWeather} className='search-btn'>Search</button>
        </form>
      </div>

      <div className='weather-details'>
        <p>City: {weather && weather.name}</p>
        <p>Temperature: {weather && weather.main.temp}{weather ? "°C" : ""}</p>
        <p>Description: {weather && weather.weather[0].description}</p>
      </div>


    </div>
  );
}

export default App;