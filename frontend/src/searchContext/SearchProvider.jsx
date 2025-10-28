
import { SearchContext } from './SearchContext'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';


const SearchProvider = ({children}) => {
  const [city,setCity]=useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Create a local state to manage the input field's value.
  const [weatherData,setWeatherData]=useState({});
 const  [forecastData,setForecastData]= useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [activeTab,setActiveTab]=useState('temp');


  useEffect(() => {
    // Using a single async function to manage both API calls
    const fetchAllData = async () => {
      if (!city) {
        console.log("Enter the city name");
        setWeatherData(null);
        setForecastData(null); 
        return;
      }

      setLoading(true);
      setError(null);

      const BASE_API=import.meta.env.VITE_API_URL;
      
      try {
        // Use Promise.all to run both requests concurrently for better performance
        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get(`${BASE_API}/api/weather/${city}`),
          axios.get(`${BASE_API}/api/forecast/${city}`)
        ]);


        // This code only runs after BOTH requests have successfully finished
        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
        setDailyForecast(forecastResponse.data.daily);
        setHourlyForecast(forecastResponse.data.hourly);
        
        console.log("Current Weather:", weatherResponse.data);
        console.log("Forecast:", forecastResponse.data);

      } catch (err) {
        setError('Could not fetch weather data.');
        setWeatherData({});
        setForecastData({});
        setDailyForecast([]);
        setHourlyForecast([]);
        console.error("Fetch error:", err); // Use console.error for errors
      } finally {
        // This will only run once, after everything is finished.
        setLoading(false);
      }
    };

    fetchAllData();

  }, [city]);
  
  
  
  const value = {
    city,
    setCity,
    searchTerm, 
    setSearchTerm,
    weatherData,
    forecastData,
    dailyForecast,
    hourlyForecast,
    loading,
    error,
    activeTab,
    setActiveTab
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

