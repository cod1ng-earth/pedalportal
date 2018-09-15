import React, { Component } from 'react';
import { Container, Hero, HeroBody, HeroHeader, HeroFooter, Title } from 'bloomer';

export default class CardResult extends Component {

    render() {
      return (
        <div className="result">
            {this.props.item.name}
        </div>
      );
    }

}
  

