import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Loader className="h-20 w-20 animate-spin "/>
    </div>
  )
}

export default Loading
