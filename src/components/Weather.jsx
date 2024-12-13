import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
    const [city, setCity] = useState("");
    const[err, setErr]=useState("");
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "180c2ff9a08c755276bac39b76063f85";

    // const fetchWeather = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get(
    //             `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    //         );
    //         console.log(response)
    //         setWeatherData(response.data);
    //     } catch (error) {
    //         console.error("Error fetching weather data", error);
    //     }
    // };
            axios.
            get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then((responce)=>setCity(responce.setWeatherData))
            .catch((error)=>setErr(error))
            console.log(city)

    return (
        <div className="weather-container">
            <h2>Weather App</h2>
            <form onSubmit={fetchWeather}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData && (
                <div className="weather-info">
                    <h3>{weatherData.name}</h3>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
