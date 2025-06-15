import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudSun,
  faSearch,
  faTint,
  faWind,
  faCompressAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export default function Weather() {
  interface WeatherCondition {
    icon: string|undefined;
    text: string;
  }

  interface WeatherData {
    temp_c: string;
    humidity: string;
    uv: string;
    pressure_mb: string;
    wind_kph: string;
    condition: WeatherCondition;
  }
  interface LocationData {
    name: string;
    country: string;
  }
  const [city, setCity] = useState("Colombo");
  const [location, setLocation] = useState<LocationData>({name:"",country:""});
  const [weatherDetails, setWeatherDetails] = useState<WeatherData>({temp_c:"",humidity:"",uv:"",pressure_mb:"",wind_kph:"",condition:{icon:undefined,text:""}});
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState("")
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_WEATHER_API_URL;
  const fetchDetails = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(
        `${API_URL}${encodeURIComponent(city)}&key=${API_KEY}`,
        {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
       setError("We couldn't find that city. Please check the spelling and try again.");
      }
      const data = await response.json();
      setIsLoading(false);
      setWeatherDetails(data.current);
      setLocation(data.location);
    } catch (error) {
      setIsLoading(false);
      const err = error as Error;
      setError(err.message || "An unexpected error occurred.");
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div className="container">
      <header>
        <h1>
          <FontAwesomeIcon icon={faCloudSun}/> Weather Reporter
        </h1>
        <p>Get current weather conditions anywhere</p>
      </header>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search for a city (e.g. London, Tokyo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
    if (e.key === 'Enter') {
      fetchDetails();
    }
  }}
        />
        <button className="search-button" title="search" onClick={fetchDetails} >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {isLoading && (
        <div className="weather-container">
          <div className="card current-weather">
            <div className="spinner" />
          </div>
        </div>
      )}
      {!isLoading && error && (
        <div className="weather-container">
          <div className="card current-weather">
          <p className="error">{error}</p>
          </div>
        </div>
      )}
      {!isLoading && !error &&(
        <div className="weather-container">
          <div className="card current-weather">
            <div className="location">
              <h2>
                {location.name},{location.country}
              </h2>
              <p className="date"></p>
            </div>

            <div className="weather-main">
              <div>
                <img
                  className="weather-icon"
                  src={weatherDetails.condition.icon}
                  alt="Weather icon"
                />
                <p id="weather-description">{weatherDetails.condition.text}</p>
              </div>
              <div className="temperature">{weatherDetails.temp_c}°C</div>
            </div>

            <div className="weather-details">
              <div className="detail-card">
                <FontAwesomeIcon icon={faTint} className="humidity"/>
                <h4>Humidity</h4>
                <p className="detail-value">{weatherDetails.humidity}%</p>
              </div>

              <div className="detail-card">
                <FontAwesomeIcon icon={faWind} className="wind-speed"/>
                <h4>Wind Speed</h4>
                <p className="detail-value">{weatherDetails.wind_kph}km/h</p>
              </div>

              <div className="detail-card">
                <FontAwesomeIcon icon={faSun} className="uv"/>
                <h4>UV Index</h4>
                <p className="detail-value">{weatherDetails.uv}</p>
              </div>

              <div className="detail-card">
                <FontAwesomeIcon icon={faCompressAlt} className="pressure"/>
                <h4>Pressure</h4>
                <p className="detail-value">{weatherDetails.pressure_mb} mb</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
