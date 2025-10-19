import React from 'react'
import { SearchContext } from './SearchContext'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchProvider = ({children}) => {
  const [city,setCity]=useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Create a local state to manage the input field's value.
  const [weatherData,setWeatherData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);




  useEffect(()=>{
    const fetchWeather =async ()=>{
      if(!city){
        console.log("Enter the city name");
        setWeatherData(null);
        return;
      };
      setLoading(true);
      setError(null); //Clear previous errors before a new request

    //^ 1. The try/catch block MUST wrap the async operation (axios call)
    try {
        const response = await axios.get(`/api/weather/${city}`);
        console.log(response.data.city);
        setWeatherData(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Could not fetch weather data.');
        setWeatherData({}); // Clear data on error
        console.log("Fetch error:", err); // Log the actual error for debugging
      } finally {
        // This runs whether the fetch succeeded or failed
        setLoading(false);
      }
    };
    fetchWeather();
    },[city]); // The dependency array ensures this runs only when `city` changes

  // Creating an object to store all the states
  const value = {
    city,
    setCity,
    searchTerm, 
    setSearchTerm,
    weatherData,
    loading,
    error,
  };
  return (
    <div>
       <SearchContext.Provider value={value}>    {/* Always objects are passed to the value attribute */}
         {children}
       </SearchContext.Provider>
    </div>
  )
}

export default SearchProvider

