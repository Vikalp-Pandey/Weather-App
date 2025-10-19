import { CloudSunIcon } from 'lucide-react'
import React from 'react'

const Welcome = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
    <CloudSunIcon className="w-30 h-30 text-yellow-300" />
      <h1 className='text-5xl'>
          Welcome, to Mausam. 
      </h1>
      <p className='text-2xl'>Search Weather for any city</p>
      
     
    </div>
  )
}

export default Welcome
