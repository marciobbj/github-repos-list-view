import React from 'react';

const Result = (props) => {
    return (
      <div className="resultContainer">
        <img src={props.avatar_url} alt={props.name} />
        <span>{props.name}</span>
      </div>
    )
  }

export default Result;
