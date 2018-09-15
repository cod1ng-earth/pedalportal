import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import MapBox from './components/map_box'
import CardResults from './components/CardResults'

import './all.css';

const demoData = require ('./demodata/sheet.json');

class App extends Component {
  render() {
    return (
      <div className="App">
          <SearchHero />
          <MapBox />
          <CardResults results={demoData.results} />
      </div>
    );
  }
}

export default App;
