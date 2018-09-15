import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import Map from './components/map'
import CardResults from './components/CardResults'

import './all.css';

const demoData = require ('./demodata/sheet.json');

class App extends Component {
  render() {
    return (
      <div className="App">
          <SearchHero />
          <Map />
          <CardResults results={demoData.results} />
      </div>
    );
  }
}

export default App;
