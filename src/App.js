import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import MapBox from './components/MapBox'
import CardResults from './components/CardResults'
import Footer from './components/Footer'
import './all.css'

const _includes = require('lodash.includes')

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      tags: [],
      selectedTags: []
    }
    this.onTagChanged = this.onTagChanged.bind(this)
  }

  componentDidMount() {
    this._fetch()
  }

  _fetch() {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT
    const url = process.env.REACT_APP_DEMO === 'true' ? baseUrl + "/?demo=true" : baseUrl;

    fetch(url, {
      method: 'GET',
    }).then(resp => {
      resp.json().then(json => {
        this.setState(json);
      })
    })
  }

  onTagChanged(tag) {
    if (_includes(this.state.selectedTags, tag)) {
      this.setState({
        selectedTags: this.state.selectedTags.filter(item => item !== tag)
      });
    } else {
      this.setState({
        selectedTags: this.state.selectedTags.concat([tag])
      });
    }
  }

  render() {
    return (
      <div className="App">
          <SearchHero />
          <MapBox 
            results={this.state.result} 
            tags={this.state.tags} 
            selectedTags={this.state.selectedTags}
            onTagChanged={this.onTagChanged}
          />
          <CardResults 
            results={this.state.result} 
            tags={this.state.tags} 
            selectedTags={this.state.selectedTags} 
          />
          <Footer />
      </div>
    );
  }
}

export default App;
