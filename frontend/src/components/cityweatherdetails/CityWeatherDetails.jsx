import React, { useContext, useState } from 'react'
import { ArrowDown, ArrowUp, DropletIcon, GaugeIcon, Loader, SunIcon, ThermometerSunIcon } from 'lucide-react';
import { SearchContext } from '../../searchContext/SearchContext';
import WeatherInfo from '../WeatherContent/WeatherInfo';
import TemperatureChart from '../WeatherContent/TemperatureChart';
import WindChart from '../WeatherContent/WindChart';

const CityWeatherDetails = () => {

// Global States
    const {activeTab, setActiveTab} = useContext(SearchContext);

// Event handlers
  const handleTabClick =(tabName)=>{
      setActiveTab(tabName);
  };

  const handleTempClick = ()=>{
    handleTabClick('temp')
  };
  const handlePrecipClick = ()=>{
    handleTabClick('precip')
  };
  const handleWindClick = ()=>{
    handleTabClick('wind')
  };

  return (
    <div className='px-15 w-1/2 h-[50%] flex flex-col'>
      <div className='flex justify-start gap-3 '>
         <div className='cursor-pointer ' onClick={handleTempClick} >
              Temperature
          {activeTab == 'temp' && (<div className=' h-0.5 w-22 bg-[#f8bb03]'></div>)}
          </div> 

         <span className='text-gray-1000 font-extralight'>|</span>

         <div className='cursor-pointer' onClick={handlePrecipClick} >
              Precipitation
          {activeTab == 'precip' && (<div className=' h-0.5 w-22 bg-[#f8bb03]'></div>)}
          
          </div> 

         <span className='text-gray-900 font-extralight'>|</span>

         <div className='cursor-pointer' onClick={handleWindClick}>
             Wind
          {activeTab == 'wind' && (<div className=' h-0.5 w-10 bg-[#f8bb03]'></div>)}
      
          </div> 
      </div>
      
    <div> <WeatherInfo/></div>
    </div>
  )
}

export default CityWeatherDetails
