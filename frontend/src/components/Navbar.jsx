import {React, useContext, useState } from 'react';
import { SearchContext } from '../searchContext/SearchContext';
import { SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
//^ M-1 : Use the context to get the setter function
  const { city, setCity,searchTerm, setSearchTerm } = useContext(SearchContext);
  const navigate = useNavigate();

//   Event Handlers
  const handleChange=(e)=>{
    setSearchTerm(e.target.value);
  }
  const handleClick=()=>{
    if(searchTerm){
      setCity(searchTerm)
      navigate("/home")
      // console.log(city);
    }
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
       handleClick();  
       navigate("/home")
    }
  };


  return (
    <div className='bg-blue-400 container px-4 h-14 w-[100%] border-b-white flex items-center gap-7'>
       <div className='text-2xl'>Mausam</div>
       <div className='bg-blue-600 rounded-2xl px-3 h-8 w-[700px] flex justify-between items-center'>
           <SearchIcon className='h-4 ' />
           <input type="text" className='w-[650px] outline-none' placeholder='Search for City' onChange={handleChange}
             onKeyDown={handleKeyDown} // Trigger search on Enter key
           />
           <button className='bg-red-800 px-4 rounded-2xl cursor-pointer 
             hover:scale-105'  
              onClick={handleClick}>Search</button>
       </div>
       </div>
  )
}

export default Navbar
