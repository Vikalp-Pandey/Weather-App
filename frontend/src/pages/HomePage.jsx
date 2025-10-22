import React, { useContext } from 'react'
import CityTemperature from '../components/citytempdetails/CityTemperature'
import CityWeatherDetails from '../components/cityweatherdetails/CityWeatherDetails'
import Loading from '../components/Loading'
import { SearchContext } from '../searchContext/SearchContext'
import { useNavigate } from 'react-router-dom'
import TemperatureChart from '../components/WeatherContent/TemperatureChart'
import WeatherForecast from '../components/WeatherContent/WeatherForecast'
import WeatherInfo from '../components/WeatherContent/WeatherInfo'

const HomePage = () => {
  const {loading,error,weatherData} =useContext(SearchContext);
  const navigate = useNavigate();

// 1. Show a loading spinner while fetching
  if(loading){
      return <Loading className="flex items-start" />;
  }
// 2. Show an error message if the fetch failed
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
// 3. Show a prompt if there's no data to display
  if (!weatherData) {
    navigate("/");
    return <div>Weather details not found</div>;
    
  }

  return (
    <div className='px-4 py-5 h-100 bg-black flex flex-col justify-center items-center'>
       <CityTemperature/>
       <CityWeatherDetails/>
    </div>
  )
}

export default HomePage
