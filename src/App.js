import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import MapBox from './components/map_box'
import CardResults from './components/CardResults'

import './all.css';

const qrCode = require('./img/pedalportal.png');

const demoData = require ('./demodata/sheet.json');

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      tags: {},
      result: [],
      filter: {}
    }
    this.onFilter = this.onFilter.bind(this)
  }
  componentDidMount() {
    this._fetch()
  }

  _fetch() {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT
    let url = baseUrl;
    if (process.env.REACT_APP_DEMO == 'true') {
      url += "/?demo=true";
    }

    fetch(url, {
      method: 'GET',
    }).then(resp => {
      resp.json().then(json => {
        this.setState({result:json.result, tags: json.tags});
      })
    })
  }

  onFilter(filter) {
    this.setState({filter})
  }

  render() {
    return (
      <div className="App">
          <SearchHero />
          <MapBox onFilter={this.onFilter} {...this.state} />
          <CardResults {...this.state} />
      </div>
    );
  }
  onCompon
}

export default App;
