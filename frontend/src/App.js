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
    if (prevState.username != this.state.username){
      const reposPromise = ghClientInstance.fetchByUsername(this.state.username).then(
        response => {
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
          <h3 style={{margin: "10px 0"}}>Search Github: {this.state.username} </h3>
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