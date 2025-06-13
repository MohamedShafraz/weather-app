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
      <div>
        <header>
            <h1><FontAwesomeIcon icon={faCloudSun}/> Weather Reporter</h1>
            <p>Get current weather conditions anywhere</p>
        </header>
        
        <div>
            <input 
                type="text" 
                placeholder="Search for a city (e.g. London, Tokyo)" 
                value={"Colombo"}
            />
            <button name="search" title="search" onChange={() => "Search button clicked"}><FontAwesomeIcon icon={faSearch}/></button>
        </div>
        <div>
            <div>
                <div>
                    <h2>{location.name},{location.country}</h2>
                    <p></p>
                </div>
                
                <div>
                    <div>{WeatherDetails.temp_c}°C</div>
                </div>
                
                <div>
                    <div>
                        <FontAwesomeIcon icon={faTint}/>
                        <h4>Humidity</h4>
                        <p>{WeatherDetails.humidity}%</p>
                    </div>
                    
                    <div>
                        <FontAwesomeIcon icon={faWind}/>
                        <h4>Wind Speed</h4>
                        <p>{WeatherDetails.wind_kph}km/h</p>
                    </div>
                    
                    <div>
                        <FontAwesomeIcon icon={faSun}/>
                        <h4>UV Index</h4>
                        <p>{WeatherDetails.uv}</p>
                    </div>
                    
                    <div>
                        <FontAwesomeIcon icon={faCompressAlt}/>
                        <h4>Pressure</h4>
                        <p>{WeatherDetails.pressure_mb} mb</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    )
}