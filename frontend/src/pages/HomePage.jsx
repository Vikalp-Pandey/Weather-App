import React from 'react'
import CityTemperature from '../components/CityTemperature'
// import CityWeatherDetails from '../components/CityWeatherDetails'

const HomePage = () => {
  return (
    <div className='px-4 py-5 h-100 flex justify-center items-center'>
       <CityTemperature/>
       {/* <CityWeatherDetails/> */}
    </div>
  )
}

export default HomePage
