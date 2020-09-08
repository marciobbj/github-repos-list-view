import styled from "styled-components";
import React, { Component } from "react";
import Result from "./../result";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.repositories,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.repositories,
    });
  }

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.props.repositories;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter((item) => {
        // change current item to lowercase
        const lc = item.name.toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList. Using lowercase eliminates
        // issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.props.repositories;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList,
    });
  }

  render() {
    return (
      <div>
        {this.props.repositories.length > 0 ? (
          <input
            type="text"
            className="input"
            onChange={this.handleChange}
            placeholder="Search..."
          />
        ) : null}
        {this.state.filtered.map((repo) => (
          <li key={repo.name}>
            <Result
              name={repo.name}
              repo_url={repo.url}
              description={repo.description}
            />
          </li>
        ))}
      </div>
    );
  }
}

const StyledList = styled(List)`
  margin-top: 30px;
  list-style-type: none;
  font-size: 16px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & + li {
      border-top: 1px solid #eee;
    }
    img {
      width: 32px;
      margin-right: 12px;
      border-radius: 50%;
      border: 2px solid #dbdbdb;
    }
    a {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #7159c1;
      }
    }
    button {
      color: #999;
      background: none;
      border: 0;
      padding: 6px 0 6px 16px;
      &:hover {
        color: #7159c1;
      }
    }
  }
`;

export default StyledList;
