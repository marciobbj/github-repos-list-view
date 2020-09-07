import React, { useState, Component }from 'react';
import './App.css';
import GlobalStyle from './styles/global'
import Search from './components/search'
import Result from './components/result'
import Container from './components/container'
import List from './components/list'


class Main extends Component {
  state = {
    repositories: [
      {
        name: 'facebook/react',
        owner: {
          name: 'facebook',
          avatar_url: 'https://avatars3.githubusercontent.com/u/69631?v=4',
        },
      },
    ],
    loading: false,
    error: false,
    errorMessage: '',
  };

  render() {
    const { repositories } = this.state;

    return (
      <Container>
        <header className="App-header">
          <h3 style={{margin: "10px 0"}}>Search Github: </h3>
          <Search />
        </header>
        
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <div>
                <a href='/'>
                  <img src={repo.owner.avatar_url} alt={repo.owner.name} />
                  <span>{repo.name}</span>
                </a>
              </div>
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