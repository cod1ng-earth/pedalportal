import React, { Component } from 'react';

import SearchHero  from './components/SearchHero'

import './all.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <SearchHero />
      </div>
    );
  }
}

export default App;
