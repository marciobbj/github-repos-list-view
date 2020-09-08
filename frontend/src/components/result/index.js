import React from "react";

const Result = (props) => {
  return (
    <div className="resultContainer">
      <a target="_blank" href={props.repo_url}>
        Name: {props.name}
      </a>
      <p>Description: {props.description}</p>
    </div>
  );
};

export default Result;
