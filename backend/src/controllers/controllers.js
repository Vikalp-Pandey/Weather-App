import axios from 'axios';



//^ A Route to Get Any City Weather
export const getCityWeather= async (req, res) => {
  try {
    const { city } = req.params;
    const BASE_API="https://api.openweathermap.org"
    const response = await axios.get(`${BASE_API}/data/2.5/weather`, {
      params: {
        q: city,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric' // Celsius
      }
    });
    res.json(response.data);
    
  } catch (error) {
    res.status(500).json({ error: 'City not found or API error' });
  }
}

//^ A Route to Get Any City Weather Forecast
export const getCityForecast =async (req, res) => {
    const { city } = req.params;
    if (!city) {
        return res.status(400).json({ message: 'A city name is required.' });
    }
    
    const apiKey = process.env.WEATHERAPI_KEY;

    try {
        const forecastApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=8`;
        
        console.log(`Fetching forecast for city: ${city}`);
        const forecastResponse = await axios.get(forecastApiUrl);
        const forecastData = forecastResponse.data;

        // --- A. Process DAILY Data (for the 8-day cards) ---
        const daily = forecastData.forecast.forecastday.map(day => ({
            dt: day.date_epoch,
            weekday: new Date(day.date).toLocaleString('en-US', { weekday: 'short' }),
            temp_max: Math.round(day.day.maxtemp_c),
            temp_min: Math.round(day.day.mintemp_c),
            icon: day.day.condition.icon,
            description: day.day.condition.text
        }));

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
                precip_mm: hour.precip_mm,
                precip_in:hour.precip_in
            }));

        const current = {
             name: forecastData.location.name,
             temp_c: Math.round(forecastData.current.temp_c),
             condition_text: forecastData.current.condition.text,
             condition_icon: forecastData.current.condition.icon,
             humidity: forecastData.current.humidity,
             wind_kph: forecastData.current.wind_kph,
             precip_mm: forecastData.current.precip_mm,
        };


        // 5. Send the final, combined data object back to the frontend
        // res.status(200).json({ current, daily, hourly });
        res.status(200).json({ forecastData });


    } catch (error) {
        // console.error("Error fetching weather data:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 400) {
             return res.status(404).json({ message: `City not found: ${city}` });
        }
        res.status(500).json({ message: 'Failed to fetch weather data.' });
    }
}

