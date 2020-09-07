import React, { useState, Component }from 'react';
import './App.css';
import GlobalStyle from './styles/global'
import Search from './components/search'
import Result from './components/result'
import Container from './components/container'
import List from './components/list'
import ghClientInstance from './external_clients/github';


class Main extends Component {
  
  constructor(props) {
    super(props)
    this.changeUsername = this.changeUsername.bind(this)
  }

  state = {
    repositories: [],
    loading: false,
    error: false,
    errorMessage: '',
    username:'',
    avatar: '',
  };
  
  componentDidUpdate(prevProps, prevState) {
    // if the new username value is different than
    // the previous one, then we make the Github call.
    if (prevState.username != this.state.username){
      const reposPromise = ghClientInstance.fetchByUsername(this.state.username).then(
        response => {
          // spread all the information inside the repositories states
          // and save the user avatar in the state as well.
          this.setState({
            repositories: [...response.data.repositoryOwner.repositories.nodes],
            avatar: response.data.repositoryOwner.avatarUrl
          })
          return
        }).catch(err => console.error(err))
      return
    }
  }

  changeUsername(username) {
    this.setState({
      username: username
    })
  }

  render() {
    const { repositories } = this.state;

    return (
      <Container>
        
        <header className="App-header">
          <h3 style={{margin: "10px 0", textAlign: "center"}}>Search Github: {this.state.username} </h3>
          <Search usernameHandler={this.changeUsername}/>
        </header>

        <div className="UserAvatar">
          <img style={{margin: "5px"}} src={this.state.avatar}></img>
          <p style={{margin: "5px"}}>{this.state.username ? `User ${this.state.username} has ${repositories.length} repos available.`: null}</p>
        </div>
        
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
                <Result 
                  name={repo.name}
                  repo_url={repo.url}
                  description={repo.description}
                />
            </li>
          ))}
        </List>

      </Container>
    )
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