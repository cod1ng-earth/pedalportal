import React, { Component } from 'react';
import { Container, Hero, HeroBody, HeroHeader, HeroFooter, Title } from 'bloomer';

export default class SearchHero extends Component {
    render() {
      return (
        <Hero isColor='info' isSize='medium'>
            <HeroHeader>
            </HeroHeader>

            <HeroBody>
                <Container hasTextAlign='centered'>
                    <Title>Search!</Title>
                </Container>
            </HeroBody>

            <HeroFooter>
            
            </HeroFooter>
        </Hero>
      );
    }
  }
  

