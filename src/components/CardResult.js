import React, { Component } from 'react';
import { Card, CardHeader, CardHeaderTitle, CardHeaderIcon, CardImage, CardContent, Content, Image } from 'bloomer';

export default class CardResult extends Component {

    render() {
      return (
        <Card>
          <CardHeader>
              <CardHeaderTitle>
                  {this.props.name}
              </CardHeaderTitle>
          </CardHeader>
          <CardImage>
              <Image isRatio='4:3' src='https://via.placeholder.com/1280x960' />
          </CardImage>
          <CardContent>
              <Content>
                  {this.props.description}
                  <br/>
                  <small>{this.props.opening_times}</small>
              </Content>
          </CardContent>

        </Card>
      );
    }

}
  

