import React, { Component } from 'react';
import { Container, Hero, HeroBody, HeroHeader, Field, Label, Control, Input, Title, Image } from 'bloomer';

const qrCode = require('../img/pedalportal.png');

export default class SearchHero extends Component {
    render() {
      return (
        <Hero isColor='info' isSize='small'>
            <HeroHeader>
                
            </HeroHeader>

            <HeroBody>
                <Container hasTextAlign='centered'>
                <Title>PedalPortal</Title>
                <Image  isSize="128x128" src={qrCode} style={{margin: '0 auto'}}/>
                </Container>
            </HeroBody>

        </Hero>
      );
    }
  }
  

