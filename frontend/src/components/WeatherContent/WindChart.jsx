import React, { useContext } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Make sure react-icons is installed
import { SearchContext } from '../../searchContext/SearchContext'; // Adjust path if needed
import { formatTimeWithDay } from '../../utils/DateandTime';


function WindChart() {
  // Get the PRE-PROCESSED hourly data from the context

  const { forecastData } = useContext(SearchContext);
  const hourlyWindData = forecastData?.hourly; 
  const hourlyWindDataAfter3Hrs = hourlyWindData.filter((hour,index)=> index%3==0);


  // If there's no hourly data, display nothing or a message
  if (!hourlyWindDataAfter3Hrs || hourlyWindDataAfter3Hrs.length === 0) {
    return <div className="p-4 text-gray-400">No hourly wind data available.</div>;
  }

  return (

    // Container div - allows horizontal scrolling
    <div className="flex space-x-1 mt-9 mb-4 px-0.3 h-1/2 bg-black rounded-lg overflow-x-clip scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900">
      
      {/* Map over the ENTIRE hourlyWindData array (all future hours for 8 days) */}
      {hourlyWindDataAfter3Hrs.map((hour, index) => {
        
        const rotation = (hour.wind_degree ? (hour.wind_degree + 180) : 180) % 360; // Default to North if missing

        const displayTime = formatTimeWithDay(hour.time_epoch);
        // Assume 'displayTime' holds the string like "Thu 12 am" or just "12 am"
        
        // Split the string by spaces
        const parts = displayTime.split(' ');
        
        // Get the last two parts (hour and am/pm) and join them
        const timeOnly = parts.slice(-2).join(' ');
        
        // Now 'timeOnly' will contain "12 am"
     
        return (
            
          // Individual hourly item container
        <div
            className="mt-5 flex flex-col items-start gap-1  text-gray-400 font-sans min-w-[62px] flex-1 text-center" // Added flex-shrink-0
            key={hour.time_epoch || index} // Use epoch if available for a better key
        >
             {/* Wind Speed */}
            <div className="text-sm mb-5 text-gray-400 whitespace-nowrap">
              {/* Backend already rounds wind_kph */}
              {hour.wind_kph} km/h
            </div>

            {/* Icon */}
            <div className="text-sm text-blue-400 mb-4 flex justify-center">

              {/* Add a fallback rotation if wind_degree is missing */}
              <FaArrowUp style={{ transform: `rotate(${rotation}deg)` }} />
            </div>

            {/* Time  */}
            <div className="text-[12px] px-1.5 pt-0.3 mt-1 mb-3 whitespace-nowrap ">{timeOnly}</div>
            
          </div>
        );
      })}
    </div>
  );
}

export default WindChart;
