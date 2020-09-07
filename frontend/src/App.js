import React, { useState }from 'react';
import './App.css';
import GlobalStyle from './styles/global'
import Search from './components/search'
import Result from './components/result'

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <header className="App-header">
        <h1>Search Github repositories:</h1>
        <Search />
      </header>

      <div className='ListView'>
        <Result />
      </div>
    </div>
  );
}

export default App;
