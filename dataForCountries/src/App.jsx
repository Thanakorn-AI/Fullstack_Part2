// dataForCountries/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null);  
    setWeather(null);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailsClick = (country) => {
    setSelectedCountry(country);
    fetchWeatherData(country.capital[0]);
  };

  const fetchWeatherData = (capital) => {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;  // Ensure you've set up this environment variable
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => console.error('Weather fetching error:', error));
  };

  return (
    <div>
      <h1>Country Data</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for a country..." />
      <div>
        
      {searchTerm && filteredCountries.length > 10 ? (
          <p>Enter more letters to specify the search results</p>
        ) : selectedCountry ? (
          <div>
            <h2>{selectedCountry.name.common}</h2>
            <p>Capital: {selectedCountry.capital[0]}</p>
            <p>Area: {selectedCountry.area} km²</p>
            <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="100px" />
            <h3>Languages:</h3>
            <ul>
              {Object.values(selectedCountry.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            {weather && (
              <div>
                <h3>Weather in {selectedCountry.capital[0]}</h3>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Weather: {weather.weather[0].main} ({weather.weather[0].description})</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: '100px', height: '100px' }}/>
              </div>
            )}
            <button onClick={() => setSelectedCountry(null)}>Back to List</button>
          </div>
        ) : searchTerm && (
          <div>
            {filteredCountries.map(country => (
              <div key={country.cca3}>
                {country.name.common}
                <button onClick={() => handleDetailsClick(country)}>More Details</button>
              </div>
            ))}
          </div>
        )}

        
      </div>
    </div>
  );
}

export default App;
