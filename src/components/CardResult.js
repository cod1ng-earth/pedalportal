import React, { Component } from 'react';
import { Card, CardHeader, CardHeaderTitle, CardImage, CardContent, Content, Image } from 'bloomer';

const Placeholders = ['https://images.unsplash.com/photo-1521677247769-fa574e116d69?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18085ece091923befd06eb1b0663edd3&auto=format&fit=crop&w=750&q=80',
'https://images.unsplash.com/photo-1535659184496-06bea05c16c0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3ca00a97b1fe7879bd686091c09c4819&auto=format&fit=crop&w=1650&q=80',
'https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e71160983b3af78d30b19751a9574ce4&auto=format&fit=crop&w=694&q=80'
]

export default class CardResult extends Component {
    render() {
      const placeholder = Placeholders[Math.floor(Math.random() * 3)]

      return (
        <Card>
          <CardHeader>
              <CardHeaderTitle>
                  {this.props.element.name}
              </CardHeaderTitle>
          </CardHeader>
          <a href={this.props.element.deeplink} target="_blank">
            <CardImage>
                <Image isRatio='4:3' src={placeholder} />
            </CardImage>
          </a>
          <CardContent>
              <Content>
                  {this.props.element.description}
                  <br/>
                  <small>{this.props.element.opening_times}</small>
              </Content>
          </CardContent>
        </Card>
      );
    }

}


