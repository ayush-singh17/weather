import React, { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'



function App() {
  const [city,setCity] = useState("");
  const[weather,setWeather] = useState(null);
  async function handleSearch(e){
    e.preventDefault();
    if(city.trim()=="") return;
    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const data = await response.json();
    if(!(data.results && data.results.length>0)){
      alert("City not found");
      return;
    }
    const {latitude,longitude,name,country} = data.results[0];
    const response1 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);
    const data1 = await response1.json();
    setWeather({ name, country, temp: data1.current.temperature_2m, humidity: data1.current.relative_humidity_2m, wind: data1.current.wind_speed_10m })
    console.log(city);
  }
  return (
    <>
      <form onSubmit={handleSearch}>
        <input type='text' value = {city} onChange={(e)=>setCity(e.target.value)}/>
        <button type='submit'>Search</button>
      </form>
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.country}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind} km/h</p>
        </div>
      )}
    </>
  )
}

export default App
