// dataForCountries/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCountry(null);  
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDetailsClick = (country) => {
    setSelectedCountry(country);
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
