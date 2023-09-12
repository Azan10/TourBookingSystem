import React, { useState } from 'react';


function SearchBar({SearchQuery,setSearchQuery}) {
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
   
   
   <input onChange={handleSearch} className="rounded-full pl-4 pr-12 py-2 border  focus:border-blue-500 focus:outline-none" type="text" placeholder="Seach Tours.."/>

  )
    
}

export default SearchBar;
