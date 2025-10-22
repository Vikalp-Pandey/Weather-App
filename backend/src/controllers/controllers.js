import axios from 'axios';
import dotenv from 'dotenv';
// dotenv.config(); // To load the env variables here in this file


const BASE_API="https://api.openweathermap.org"

//^ A Route to Get Any City Weather
export const getCityWeather= async (req, res) => {
  try {
    const { city } = req.params;

    const response = await axios.get(`${BASE_API}/data/2.5/weather`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric' // Celsius
      }
    });
    res.json(response.data);
    // console.log(response.data);
    
  } catch (error) {

    // It's still very important to log the detailed error!
    // console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'City not found or API error' });
  }
}

export const getCityForecast =async (req, res) => {
    // Get the city name from the query parameters sent by the frontend
    const { city } = req.params;

    // --- Input Validation ---
    if (!city) {
        return res.status(400).json({ message: 'A city name is required.' });
    }

    // IMPORTANT: Make sure your .env file has a WEATHERAPI_KEY variable
    const apiKey = process.env.WEATHERAPI_KEY;

    try {
        // --- STEP 1: Fetch Forecast from WeatherAPI.com (Geocoding is built-in) ---
        const forecastApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=8`;
        
        console.log(`Fetching forecast for city: ${city}`);
        const forecastResponse = await axios.get(forecastApiUrl);
        const forecastData = forecastResponse.data;

        // --- Process and Simplify the Data ---
        // --- A. Process DAILY Data (for the 8-day cards) ---
        const daily = forecastData.forecast.forecastday.map(day => ({
            dt: day.date_epoch,
            weekday: new Date(day.date).toLocaleString('en-US', { weekday: 'short' }),
            temp_max: Math.round(day.day.maxtemp_c),
            temp_min: Math.round(day.day.mintemp_c),
            icon: day.day.condition.icon,
            description: day.day.condition.text
        }));

        // --- B. Process HOURLY Data (for the temperature chart) ---
        // Combine the hourly arrays from today and tomorrow to look ahead 24 hours
        
        // const todayHours = forecastData.forecast.forecastday[0].hour.wind_kph;
        const todayHours = forecastData.forecast.forecastday[0].hour
        const tomorrowHours = forecastData.forecast.forecastday[1] ? forecastData.forecast.forecastday[1].hour : [];
        const combinedHours = [...todayHours, ...tomorrowHours];
        const combinedHoursForAllDays = forecastData.forecast.forecastday.flatMap(day => // 1. Iterate over each 'day'
                day.hour.map(hour => ({ // 2. Map over the 'hour' array within each day
                  time_epoch: hour.time_epoch,
                  time: hour.time,
                  temp: Math.round(hour.temp_c),
                  wind_kph: Math.round(hour.wind_kph),
                  wind_dir: hour.wind_dir,
                  precip_mm: hour.precip_mm,
                  precip_in: hour.precip_in
  }))
);

// console.log(combinedHoursForAllDays);
        
        const now = new Date();

        const hourly = combinedHours
            .filter(hour => new Date(hour.time_epoch * 1000) >= now) // Get only future hours
            .slice(0, 24) // Ensure we only have 24 entries for the next 24 hours
            .map(hour => ({
                time_epoch: hour.time_epoch,
                time: new Date(hour.time_epoch * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toLowerCase(),
                temp: Math.round(hour.temp_c),
                wind_kph: Math.round((hour.wind_kph)),
                wind_degree: Math.round((hour.wind_degree)),
                wind_dir: hour.wind_dir,
                // precip_mm: hour.precip_mm,
                // precip_in:hour.precip_in
            }));

        // --- C. Process CURRENT Data ---
        const current = {
             name: forecastData.location.name,
             temp_c: Math.round(forecastData.current.temp_c),
             condition_text: forecastData.current.condition.text,
             condition_icon: forecastData.current.condition.icon,
             humidity: forecastData.current.humidity,
             wind_kph: forecastData.current.wind_kph,
             precip_mm: forecastData.current.precip_mm,
        };

        // --- D. Process WIND Speed ---
        
        // 5. Send the final, combined data object back to the frontend
        res.status(200).json({ current, daily, hourly });
        // res.status(200).json(forecastData);


    } catch (error) {
        // --- Error Handling ---
        console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
        // Handle city not found error from WeatherAPI
        if (error.response && error.response.status === 400) {
             return res.status(404).json({ message: `City not found: ${city}` });
        }
        res.status(500).json({ message: 'Failed to fetch weather data.' });
    }
}

// export const getCityForecast = async (req, res) => {
//   const {city} = req.params;
//   try{
//    const geocodinResponse = await axios.get(`${BASE_API}/geo/1.0/direct`,{
//     params:{
//       q:city,
//       appid:process.env.OPENWEATHER_API_KEY,
//       limit:5
//     }
//    })
//    const geoCoordinates = geocodinResponse.data
//    if (!geoCoordinates || geoCoordinates.length === 0) {
//             console.error('City not found');
//             return res.json({"Msg":"City not found" });
//         }
//    const firstResult = geoCoordinates[0];
//    const {lat, lon} = firstResult

  
//     const foreCastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
//     const forecastResponse = await axios.get(foreCastURL);
//     const foreCastData = forecastResponse.data;
//     // res.json({foreCastData});


//     const kelvinToCelsius = (kelvin) => kelvin - 273.15;



// // We slice the first 8 items from the list, as they represent the next 24 hours (8 * 3 = 24)
// const hourly = foreCastData.list.slice(0, 5).map(item => {
//     const date = new Date(item.dt * 1000); // Convert Unix time (seconds) to milliseconds
//     return {
//         // Formats time to "3 PM", "6 PM", etc.
//         time: date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
//         temp: Math.round(item.main.temp),
//         icon: item.weather[0].icon,
//         pop: item.weather[0].pop,
//         wind: item.weather[0].wind
//     };
// });




// const dailyData = {};

// // Loop over all 40 items in the list to group them by day
// foreCastData.list.forEach(item => {
//     // Get the date part of dt_txt, e.g., "2025-10-22"
//     const dateKey = item.dt_txt.split(' ')[0];
    
//     // Convert temps to Celsius for comparison
//     const temp_c = kelvinToCelsius(item.main.temp);
    
//     // If this is the first time we see this date, create a new entry
//     if (!dailyData[dateKey]) {
//         dailyData[dateKey] = {
//             date: dateKey,
//             weekday: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//             temp_min: temp_c,     // Start with the current temp
//             temp_max: temp_c,     // Start with the current temp
//             icon: item.weather[0].icon, // Use the first icon as a fallback
//             pop: item.pop,
//             wind: item.wind
//         };
//     } else {
//         // If the date entry already exists, update the min/max temps
//         dailyData[dateKey].temp_min = Math.min(dailyData[dateKey].temp_min, temp_c);
//         dailyData[dateKey].temp_max = Math.max(dailyData[dateKey].temp_max, temp_c);
//     }
    
//     // A common strategy: use the icon from the 12:00 PM (midday) forecast
//     if (item.dt_txt.includes("12:00:00")) {
//         dailyData[dateKey].icon = item.weather[0].icon;
//     }
// });

// // Convert the dailyData object into an array and take the first 5 days.
// // We also round the final min/max temps for a clean display.
// const daily = Object.values(dailyData).slice(0, 5).map(day => ({
//     ...day,
//     temp_min: Math.round(day.temp_min),
//     temp_max: Math.round(day.temp_max)
// }));


 
//   res.json({hourly,daily});

//   }catch(error){
//     res.status(500).json({ error: 'City not found or API error' });
//   }


// }