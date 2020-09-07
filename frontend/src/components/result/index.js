import React from 'react';

const Result = (props) => {
    return (
      <div className="resultContainer">
        <a target="_blank" href={props.repo_url}>{props.name}</a>
      </div>
    )
  }

export default Result;
