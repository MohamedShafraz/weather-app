import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSun,
  faCloudSun,
  faSearch,
  faTint,
  faWind,
  faCompressAlt
} from '@fortawesome/free-solid-svg-icons';
export default function Weather(){ 
    const location = {country:"Sri Lanka",name:"Colombo"}
    const WeatherDetails = {temp_c:"37.5",humidity:"84",uv:"0.4",pressure_mb:"1004",wind_kph:"27.7"}
    return (
      <div className='container'>
        <header>
            <h1><FontAwesomeIcon icon={faCloudSun}/> Weather Reporter</h1>
            <p>Get current weather conditions anywhere</p>
        </header>
        
        <div className='search-container'>
            <input 
                className='search-input'
                type="text" 
                placeholder="Search for a city (e.g. London, Tokyo)" 
                value={"Colombo"}
            />
            <button className='search-button' title="search" onChange={() => "Search button clicked"}><FontAwesomeIcon icon={faSearch}/></button>
        </div>
        <div className='weather-container'>
            <div className='card current-weather'>
                <div className='location'>
                    <h2>{location.name},{location.country}</h2>
                    <p className='date'></p>
                </div>
                
                <div className='weather-main'>
                    <div>
                        <img id="weather-icon" className="weather-icon" src="" alt="Weather icon"/>
                        <p id="weather-description"></p>
                    </div>
                    <div className='temperature'>{WeatherDetails.temp_c}°C</div>
                </div>
                
                <div className='weather-details'>
                    <div className='detail-card'>
                        <FontAwesomeIcon icon={faTint}/>
                        <h4>Humidity</h4>
                        <p className='detail-value'>{WeatherDetails.humidity}%</p>
                    </div>
                    
                    <div className='detail-card'>
                        <FontAwesomeIcon icon={faWind}/>
                        <h4>Wind Speed</h4>
                        <p className='detail-value'>{WeatherDetails.wind_kph}km/h</p>
                    </div>
                    
                    <div className='detail-card'>
                        <FontAwesomeIcon icon={faSun}/>
                        <h4>UV Index</h4>
                        <p className='detail-value'>{WeatherDetails.uv}</p>
                    </div>
                    
                    <div className='detail-card'>
                        <FontAwesomeIcon icon={faCompressAlt}/>
                        <h4>Pressure</h4>
                        <p className='detail-value'>{WeatherDetails.pressure_mb} mb</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    )
}