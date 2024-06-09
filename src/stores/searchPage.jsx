import axios from 'axios';
import React, { useState, useEffect } from 'react';

const SearchPage = ({ onSearchResultsUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');

  const fetchSearchResults = async () => {
    try {
      let apiEndpoint = `${process.env.REACT_APP_BACKEND_URL}/brewery/search?name=${searchTerm}&city=${searchCity}`;
      if (searchType !== "") {
        apiEndpoint += `&type=${searchType}`;
      }
      const response = await axios.get(apiEndpoint, { headers:{ 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
      const data = response.data;

      if (Array.isArray(data)) {
        onSearchResultsUpdate(data); // Pass the data to the parent component
      } else {
        onSearchResultsUpdate([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchTerm, searchCity, searchType]);

  return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '5px', fontSize: '16px', outline: 'none' }}
        />
        <input
          type="text"
          placeholder="Search by City..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '5px', fontSize: '16px', outline: 'none' }}
        />
        <input
          type="text"
          placeholder="Search by Type..."
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '5px', fontSize: '16px', outline: 'none' }}
        />
      </div>

  );
};

export default SearchPage;
