import React, { Component } from 'react';
import { Container, Hero, HeroBody, HeroHeader, Field, Label, Control, Input } from 'bloomer';

export default class SearchHero extends Component {
    render() {
      return (
        <Hero isColor='info' isSize='medium'>
            <HeroHeader>
                Welcome
            </HeroHeader>

            <HeroBody>
                <Container hasTextAlign='centered'>
                <Field>
                    <Label>Name</Label>
                    <Control>
                        <Input type="text" placeholder='Text Input' />
                    </Control>
                </Field>
                </Container>
            </HeroBody>

        </Hero>
      );
    }
  }
  

