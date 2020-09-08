import React, { useState, setState } from "react";
import ghClientInstance from "./../../external_clients/github";

const Search = (props) => {
  // stores the input values and handle its
  // updates behind the covers.
  const [inputValue, setinputValue] = useState("");

  // event handler for the search bar input
  const inputEvent = (event) => {
    const data = event.target.value;
    console.log(data);
    setinputValue(data);
  };

  return (
    <div className="searchBar" style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Username:"
        value={inputValue}
        onChange={inputEvent}
      />
      <button onClick={(e) => props.usernameHandler(inputValue)}>Go!</button>
    </div>
  );
};

export default Search;
