import React, { useContext, useState } from 'react'
import { SearchContext } from '../../searchContext/SearchContext';
import { assets, getweatherImage } from '../../assets/asset';
import TemperatureChart from './TemperatureChart';


const WeatherForecast = () => {
    const {weatherData,forecastData} = useContext(SearchContext);
    const [activeTab, setActiveTab] = useState(0);

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
    <div>

        {/* Fix the image , weekday and temps for different days*/}
     <section className='pr-3 py-3 justify-between flex gap-1 '>
        { dailyForecast.map((dayData,index)=>{
            const temp_max = dayData?.temp_max
            const temp_min = dayData?.temp_min

            return <div key={index} className={`w-20 h-25 cursor-pointer rounded-lg flex flex-col items-center gap-1 ${activeTab==index ?"bg-gray-700":""}`} onClick={()=>handleClick(index)}>
                        <div>{dayData?.weekday}</div>
                        <img className='h-10 w-10' src={getweatherImage(temp_min)} alt="" />
                        <div className='flex gap-1'>
                            <div className='text-white text-[15px]'>{Math.round(temp_max)}°</div>
                            <div className='text-gray-500 text-[15px]'>{Math.round(temp_min)}°</div>
                        </div>   
                    </div>
        })}


        
      </section>
    </div>
  )
}

export default WeatherForecast

