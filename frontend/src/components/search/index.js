import React, { useState }from 'react';


const Search = () => {
    // stores the input values and handle its
    // updates behind the covers. 
    const [inputValue, setinputValue] = useState("")
  
    // event handler for the search bar input
    const inputEvent = (event) => {
      const data = event.target.value;
      console.log(data)
      setinputValue(data)
    }
  
    return (
      <div className="searchBar">
        <input
          type="text"
          placeholder="Username:"
          value={inputValue}
          onChange={inputEvent}
        />
     </div>
    )
  }

export default Search