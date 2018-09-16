import React, { Component } from 'react';

import SearchHero from './components/SearchHero'
import MapBox from './components/map_box'
import CardResults from './components/CardResults'
import { Container, Footer, Content, Columns, Column } from 'bloomer';


import './all.css';

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
          <Footer id='footer'>
            <Container>
                <Content>
                    <Columns>
                        <Column>
                            <a href="https://docs.google.com/forms/d/1FcdTAo-ZstRybqQhU_ApJsz-rsDMqUhWyU2yoIG8e_4/edit" target="_blank">add something here</a>
                        </Column>
                        <Column>
                            created on CycleHack Berlin 2018 by <a href="https://github.com/susott" target="_blank">Susanne</a> &amp; <a href="https://twitter.com/stadolf" target="_blank">Stefan</a>
                        </Column>
                    </Columns>
                </Content>
            </Container>
          </Footer>
          
      </div>
    );
  }
}

export default App;
