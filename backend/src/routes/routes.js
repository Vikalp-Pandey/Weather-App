import express from "express";
import {getCityWeather,getCityForecast} from "../controllers/controllers.js";
const router = express.Router();

router.get('/weather/:city', getCityWeather);
router.get('/forecast/:city',getCityForecast)
export default router;
