import express from "express";
import getCityWeather from "../controllers/controllers.js";
const router = express.Router();

router.get('/weather/:city', getCityWeather);

export default router;
