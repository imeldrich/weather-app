import React from 'react';
const apiKey = import.meta.env.VITE_API_KEY;

function App() {

  let styles = ""
  const [city, setCity] = React.useState("");
  const [weather, setWeather] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  async function getWeather() {

    setLoading(true)
    setError("")

    try {
      const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

      if (!weather.ok) {
        throw new Error("City not found")
      }

      const weatherData = await weather.json();
      setWeather(weatherData)
    } catch (error) {
      setError(error.message)
      setWeather("")
    }

    setLoading(false)
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getWeather()
  }

  if (weather) {
    if (weather.main.temp < 20) {
      styles = "app cold"
    } else if (weather.main.temp < 29) {
      styles = "app mild"
    } else {
      styles = "app hot"
    }
  }

  return (
    <div className={styles || "app"}>
      <div className='weather-logo'>
        <h1 className='weather-text'>Weather App</h1>
      </div>

      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter a city' onChange={handleChange} value={city} className='input'/>
          <button className='search-btn'>Search</button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className='weather-details'>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png?v=${Date.now()}`}/>
          <p className='weather-temp'>{weather.main.temp}°C</p>
          <p>{weather.name}</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}


    </div>
  );
}

export default App;