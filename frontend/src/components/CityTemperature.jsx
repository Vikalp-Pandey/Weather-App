import { ArrowDown, ArrowUp, DropletIcon, GaugeIcon, Loader, SunIcon, ThermometerSunIcon } from 'lucide-react';
import React, { useContext } from 'react';
import { SearchContext } from '../searchContext/SearchContext';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { assets } from '../assets/asset';

const CityTemperature = () => {
  const { city, loading, weatherData, error } = useContext(SearchContext);
  const navigate =useNavigate();

  // 1. Show a loading spinner while fetching
  if (loading) {
    navigate("/loading")
    return <Loading className="flex items-center" />;
  }

  
  // 2. Show an error message if the fetch failed
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  
  // 3. Show a prompt if there's no data to display
  if (!weatherData) {
    return <div>Weather details not found</div>;
    navigate("/");
  }
  
  // If we've reached this point, we know weatherData exists and is safe to use.
  const main =weatherData?.main;
  const temperature = weatherData?.main?.temp;

  console.log(weatherData.pop);

  if(temperature && weatherData){
    navigate("/home")
      return (
    <div className='px-15 w-[50%] h-[100%] flex justify-center items-center bg-gray-700 text-white p-4 rounded-lg'>
      <section className='w-[65%] flex flex-col gap-4'>
        <div className='mb-10'>
          <h1 className='text-3xl font-bold capitalize'>{city}</h1>
          {/* <p className='font-light'>Chances for rain: {parseInt(weatherData.pop)*100}</p> */}
        </div>
        {/* 4. Simplified and correct display logic */}
        <div className='text-5xl font-bold'>
         {typeof temperature === 'number' ? `${Math.round(temperature)}°` : 'N/A'}
        </div>
       
        
       <div className='mt-5 flex flex-col gap-4'>
          <div className='flex gap-3'>
            <div><ArrowDown/></div>
            <div>Minimum Temperature: {main.temp_min}</div>
          </div>
          <div className='flex gap-3'>
            <div><ArrowUp/></div>
            <div>Maximum Temperature: {main.temp_max}</div>   
          </div>
          <div className='flex gap-3'>
            <div><GaugeIcon/> </div> 
            <div>Pressure: {main.pressure}</div>
          </div>
          <div className='flex gap-3'>
            <div><DropletIcon/></div>
            <div>Humidity: {main.humidity}</div>
          </div>
          
        </div>
      </section>
      <section className='w-[35%] h-full flex justify-center items-start'>
        {/* <SunIcon className='h-30 w-30 self-start' /> */}
        <img src={assets.sun} alt="" className='h-25 w-25' />
      </section> 
    </div>
  );
  }else{
    return(
        <div className='text-3xl'>
           Temperature is not defined for {city}
        </div> 
    )
   
  }
};

export default CityTemperature;