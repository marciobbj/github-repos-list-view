import React, { useState, Component } from "react";
import "./App.css";
import GlobalStyle from "./styles/global";
import Search from "./components/search";
import Result from "./components/result";
import Container from "./components/container";
import List from "./components/list";
import ghClientInstance from "./external_clients/github";

class Main extends Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
  }

  state = {
    repositories: [],
    loading: false,
    error: false,
    errorMessage: "",
    username: "",
    avatar: "",
  };

  componentDidUpdate(prevProps, prevState) {
    // if the new username value is different than
    // the previous one, then we make the Github call.
    if (prevState.username != this.state.username) {
      // Checking whether the user is already in cache
      const cachedRepos = localStorage.getItem(this.state.username);

      if (cachedRepos) {
        this.setState({
          repositories: [...JSON.parse(cachedRepos)],
          avatar: localStorage.getItem(`${this.state.username}_avatar`),
        });
        return;
      } else {
        const reposPromise = ghClientInstance
          .fetchByUsername(this.state.username)
          .then((response) => {
            // if the client has "false" as return value
            // it means that something went wrong with the
            // request,
            if (!response) {
              this.setState({
                error: true,
                errorMessage: "Application is experiencing instability.",
              });
              return;
            }
            // caches the result
            this.onSetResult(response, this.state.username);

            this.setState({
              repositories: [
                ...response.data.repositoryOwner.repositories.nodes,
              ],
              avatar: response.data.repositoryOwner.avatarUrl,
            });
            return;
          })
          .catch((err) => console.error(err));
        return;
      }
    }
  }

  changeUsername(username) {
    this.setState({
      username: username,
    });
  }

  onSetResult(response, username) {
    const repo_label = `${username}`;
    const avatar_label = `${username}_avatar`;

    // set repos in cache
    localStorage.setItem(
      repo_label,
      JSON.stringify(response.data.repositoryOwner.repositories.nodes)
    );

    // set avatar url in cache
    localStorage.setItem(avatar_label, response.data.repositoryOwner.avatarUrl);

    return;
  }

  render() {
    const { repositories } = this.state;

    return (
      <Container>
        {this.state.error === true ? (
          <h1>Application error</h1>
        ) : (
          <>
            <header className="App-header">
              <h3 style={{ margin: "10px 0", textAlign: "center" }}>
                Search Github: {this.state.username}{" "}
              </h3>
              <Search usernameHandler={this.changeUsername} />
            </header>

            <div className="UserAvatar">
              <img style={{ margin: "5px" }} src={this.state.avatar}></img>
              <p style={{ margin: "5px" }}>
                {this.state.username
                  ? `User ${this.state.username} has ${repositories.length} repos available.`
                  : null}
              </p>
            </div>

            <List repositories={this.state.repositories} />
          </>
        )}
      </Container>
    );
  }
}

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <Main />
    </div>
  );
}

export default App;
