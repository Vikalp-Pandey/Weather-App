import sun from './sun.png'
import cloudy from './cloudy.png'
import rainy from './rainy-day.png'
import winter from './landscape.png'
import logo from './weather.png'

// import { useContext } from 'react'
// import { SearchContext } from '../searchContext/SearchContext'

// const {weatherData} = useContext(SearchContext);

// const temperature =weatherData?.main?.temp;

export const assets = {
    sun,
    cloudy,
    rainy,
    winter,
    logo
}

export const getweatherImage = (temp)=>{
    switch(true){
    case (temp<=10):
        return  assets.winter
    case (10 < temp && temp<=20):
        return assets.cloudy
    case (20<temp && temp<=30):
        return assets.rainy
    case (temp>30):
        return assets.sun
}
}

