import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import MapBox from './components/map_box'
import CardResults from './components/CardResults'

import './all.css';

const demoData = require ('./demodata/sheet.json');

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      tags: {},
      result: []
    }
  }
  componentDidMount() {
    this._fetch()
  }

  _fetch() {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT
    const url = baseUrl + "/?demo=true"
    fetch(url, {
      method: 'GET',
    }).then(resp => {
      resp.json().then(json => {
        this.setState({result:json.result, tags: json.tags});
      })
    })
  }

  render() {
    return (
      <div className="App">
          <SearchHero />
          <MapBox {...this.state}/>
          <CardResults {...this.state} />
      </div>
    );
  }
  onCompon
}

export default App;
