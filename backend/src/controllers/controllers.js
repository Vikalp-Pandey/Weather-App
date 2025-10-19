import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // To load the env variables here in this file


const BASE_API=process.env.BASE_API;

//^ A Route to Get Any City Weather
const getCityWeather= async (req, res) => {
  try {
    
    console.log("Checking the BASE_API variable:", BASE_API);
    console.log("API_Key:",process.env.API_KEY);
    
    const { city } = req.params;

    const response = await axios.get(`${BASE_API}`, {
      params: {
        q: city,
        appid: process.env.API_KEY,
        units: 'metric' // Celsius
      }
    });
    res.json(response.data);
    console.log(response.data);
    
  } catch (error) {

    // It's still very important to log the detailed error!
    console.error("API Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'City not found or API error' });
  }
}

export default getCityWeather;