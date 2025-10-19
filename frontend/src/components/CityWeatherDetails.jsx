import React, { useContext } from 'react'
import { ArrowDown, ArrowUp, DropletIcon, GaugeIcon, Loader, SunIcon, ThermometerSunIcon } from 'lucide-react';
import { SearchContext } from '../searchContext/SearchContext';

const CityWeatherDetails = () => {
    const { weatherData } = useContext(SearchContext);
    const main =weatherData?.main;
    console.log(temperature);
    const temperature = weatherData?.main?.temp;

  return (
    <div>
        <div className='gap-4'>
          <div className='flex'>
            <ThermometerSunIcon/> Temperature: {temperature}
          </div>
          <div className='flex'>
            <ArrowDown/> Minimum Temperature: {main.temp_min}
          </div>
          <div className='flex'>
            <ArrowUp/> Maximum Temperature: {main.temp_max}
          </div>
          <div className='flex'>
            <GaugeIcon/> Pressure: {main.pressure}
          </div>
          <div className='flex'>
            <DropletIcon/> Humidity: {main.humidity}
          </div>
          
        </div>
    </div>
  )
}

export default CityWeatherDetails
