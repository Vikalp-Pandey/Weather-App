import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SearchProvider from './searchContext/SearchProvider';

import { useContext } from 'react';
import { SearchContext } from './searchContext/SearchContext';
import Loading from './components/Loading';
import Welcome from './components/Welcome';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
/*
^Note:
A component can only consume context from a provider that is its ancestor (wrapped around it).
The App component can't consume the context itself as it renders the searchprovider.So we created a child component(AppComponent)
*/


//* This is the new component that is INSIDE the provider
const AppContent = () => {
  // Now this works, because AppContent is a child of SearchProvider
  const { loading, city } = useContext(SearchContext);
  return (
    <div className='w-[100%] h-[100vh] container overflow-hidden' data-theme="forest">
      <BrowserRouter>
      <Navbar />
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
};

//* The main App component just sets up the provider
const App = () => {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
};

export default App;



