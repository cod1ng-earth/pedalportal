import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import Map from './components/map'

import './all.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <SearchHero />
          <Map />
      </div>
    );
  }
}

export default App;
