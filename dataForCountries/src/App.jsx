// dataForCountries/src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Country Data</h1>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search for a country..." />
      <div>
        
      {
    searchTerm &&  filteredCountries.length > 10 ? (
    <p>Enter more letters to specify the search results</p>
  ) : filteredCountries.length === 1 ? (
    <div>
      <h2>{filteredCountries[0].name.common}</h2>
      <p>Capital: {filteredCountries[0].capital[0]}</p>
      <p>Area: {filteredCountries[0].area} km²</p>
      <img src={filteredCountries[0].flags.png} alt={`Flag of ${filteredCountries[0].name.common}`} width="100px" />
      <h3>Languages:</h3>
      <ul>
        {Object.values(filteredCountries[0].languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
    </div>
  ) : searchTerm &&  ( 
    <div>
      {filteredCountries.map(country => (
        <p key={country.cca3}>{country.name.common}</p>
      ))}
    </div>
  )
}

        
      </div>
    </div>
  );
}

export default App;
