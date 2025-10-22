import { ArrowDown, ArrowUp, DropletIcon, GaugeIcon, Loader, SunIcon, ThermometerSunIcon } from 'lucide-react';
import React, { useContext, useState } from 'react';

import { SearchContext } from '../../searchContext/SearchContext';
import { useNavigate } from 'react-router-dom';
import { getweatherImage } from '../../assets/asset';
import { currentTime, weekday } from '../../utils/DateandTime';
import { getTemperature } from '../../utils/Temperature';


const CityTemperature = () => {
  const { city, weatherData, } = useContext(SearchContext);
  const navigate =useNavigate();

  // 2. Local States
  const [activeTab,setActiveTab]=useState("Celsius");


  // If we've reached this point, we know weatherData exists and is safe to use.
  const main = weatherData?.main;
  const temperature = weatherData?.main?.temp;
  const windspeed =weatherData?.wind?.speed

  // 4. Show a prompt if there's no data to display 
  if(!temperature && !weatherData){
    navigate("/home")
    return <div className='text-3xl'>
           Temperature is not defined for {city}
      </div> 
  }

 // EventHandlers
 const handleClick = (tab)=>{
    console.log(tab)
    setActiveTab(tab)
    console.log(activeTab); 
 }


  return ( 
      <div className='pr-18 pl-15 py-10 w-1/2 h-[50%] flex justify-between'>
      <section className='flex gap-3'>
         <div><img src={getweatherImage(temperature)} alt="WeatherImage" className='h-15' /></div>
         <div className='text-5xl flex items-start'>{Math.round(getTemperature(temperature,activeTab))}</div>
         <div className={`flex items-start cursor-pointer ${activeTab=="Celsius" ? "":"text-gray-800"}`} onClick={()=>handleClick("Celsius")}>
            °C
         </div>
         <div className={`flex items-start cursor-pointer  ${activeTab=="Farenheit" ? "":"text-gray-800"}`} onClick={()=>handleClick("Farenheit")}>
            | °F
         </div>
         <div className='flex flex-col text-gray-600 '>
             <div>Precipitation: </div>
            <div>Humidity: {main?.humidity}%</div>
            <div>Wind: {Math.round(windspeed *3.6)} km/h</div>
         </div>
      </section>
      <section>
          <div className='text-2xl flex justify-end'>
            Weather
          </div>
          <div className=' text-gray-600'>
            {weekday}, {currentTime}
          </div>
      </section>
    
      

    </div>
    
    
  );
};

export default CityTemperature;