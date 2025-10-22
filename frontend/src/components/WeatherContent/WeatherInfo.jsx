import React, { useContext, useState } from 'react'
import { SearchContext } from '../../searchContext/SearchContext';
import TemperatureChart from './TemperatureChart';
import WindChart from './WindChart';

import WeatherForecast from './WeatherForecast';

const WeatherInfo = () => {
    const {weatherData,forecastData,activeTab, setActiveTab} = useContext(SearchContext);
    // const [activeTab, setActiveTab] = useState("temp");

    // Info from weatherData
    const temp_min =weatherData?.main?.temp_min
    const temp_max =weatherData?.main?.temp_min
    

    // Info from forecastData
    const dailyForecast = forecastData?.daily || []
    console.log(forecastData);
    

    // Event Handlers:
    const handleClick = (activeTab)=>{
       setActiveTab(activeTab)
    };

  return (
    <div className='mb-10 mt-10'>
      {activeTab=='temp' && <div><TemperatureChart/></div>}
      {activeTab=='wind' && <div><WindChart/></div>}
    <div><WeatherForecast/></div>
    </div>
  )
}

export default WeatherInfo
