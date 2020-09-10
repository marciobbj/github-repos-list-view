import styled from "styled-components";
import React, { Component, setState } from "react";
import Result from "./../result";
import MaterialList from "@material-ui/core/List";
import ListItemLink from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlerItemClick = this.handleItemClick.bind;
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

  handleItemClick() {
    const [open, setOpen] = setState(true);
    setOpen(!open);
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
          <div class="searchInput">
            <input
              type="text"
              className="input"
              onChange={this.handleChange}
              placeholder="Search..."
            />
          </div>
        ) : null}
        <MaterialList component="nav" aria-label="main repositories">
          {this.state.filtered.map((repo) => (
            <>
              <ListItemLink key={repo.name}>
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <a href={repo.url} default="_blank">
                  <ListItemText primary={repo.name} />
                </a>
              </ListItemLink>
              <Divider />
            </>
          ))}
        </MaterialList>
      </div>
    );
  }
}

export default List;
