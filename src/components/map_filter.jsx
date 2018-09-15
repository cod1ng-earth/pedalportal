import React, { Component } from 'react';
import { Panel, PanelHeading, PanelBlock, PanelIcon, Checkbox, Button } from 'bloomer';

import Sheet from '../demodata/sheet.json';

class MapFilter extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    const tagMap = new Map();

    Sheet.results.forEach((el) => {
      el.tags.forEach((tag) => {
        if (tagMap.has(tag)) {
          const value1 = tagMap.get(tag);
          tagMap.set(tag, [value1, el]);
        }
        else
          (tagMap.set(tag, [el]));
      });
    });
    console.log(tagMap. keys());

    const panelBlocks = tagMap.keys((el) => (
       <PanelBlock>
        <Checkbox onChange={console.log('The link was clicked.')}>
            {el.tags}
        </Checkbox>
      </PanelBlock>
   ));


    // const panelBlocks = Sheet.results.map((el, index) => (
    //   <PanelBlock key={index}> <Checkbox> {el.tags} </Checkbox> </PanelBlock>
    // ));

    return (
      <Panel>
        <PanelHeading>Map Filters</PanelHeading>
        {panelBlocks}
        <PanelBlock> <Checkbox> Shop </Checkbox> </PanelBlock>
        <PanelBlock> <Checkbox> Rent </Checkbox> </PanelBlock>
        <PanelBlock> <Checkbox> Repair </Checkbox> </PanelBlock>
        <PanelBlock> <Checkbox> Initiative </Checkbox> </PanelBlock>
        <PanelBlock>
            <Button isOutlined isFullWidth isColor='primary'> Reset all filters</Button>
        </PanelBlock>
      </Panel>);
  }
}

export default MapFilter;
