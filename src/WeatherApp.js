import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = " be8a3a56e63eb733c523a8c7680ee6f4";

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Weather Forecast</h1>

      <InputGroup>
        <Form.Control
          placeholder="Enter Location"
          aria-label="enter location"
          aria-describedby="basic-addon1"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </InputGroup>

      <Button variant="info" onClick={handleSearch}>
        Search
      </Button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p>
            Location: {weatherData.name}, {weatherData.sys.country}
          </p>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
