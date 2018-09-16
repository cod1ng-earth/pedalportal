import React from 'react';
import { Container, Footer, Content, Columns, Column } from 'bloomer';

export default (props) => (
    <Footer id='footer'>
        <Container>
            <Content>
                <Columns>
                    <Column>
                        <a href="https://docs.google.com/forms/d/1FcdTAo-ZstRybqQhU_ApJsz-rsDMqUhWyU2yoIG8e_4/edit" 
                        target="_blank"
                        rel="noopener noreferrer"
                        >add something here</a>
                    </Column>
                    <Column>
                        created on CycleHack Berlin 2018 by <a href="https://github.com/susott" 
                            target="_blank"
                            rel="noopener noreferrer"
                            >Susanne</a> &amp; <a href="https://twitter.com/stadolf" 
                            rel="noopener noreferrer" 
                            target="_blank">Stefan</a>
                    </Column>
                </Columns>
            </Content>
        </Container>
    </Footer>
)