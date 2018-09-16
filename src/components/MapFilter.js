import React, { Component } from 'react';
import { Panel, PanelHeading, PanelBlock, Checkbox, Button } from 'bloomer';

class MapFilter extends Component {
 
  render() {
    const panelBlocks = Object.keys(this.props.tags).map(tag => (
       <PanelBlock key={'filter-' + tag}>
        <Checkbox onChange={() => this.props.onTagChanged(tag)}>
            {tag}
        </Checkbox>
      </PanelBlock>
   ));

  return (
    <Panel>
      <PanelHeading>Map Filters</PanelHeading>
      {panelBlocks}
      <PanelBlock>
          <Button isOutlined isFullWidth isColor='primary'> Reset all filters</Button>
      </PanelBlock>
    </Panel>);
  }
}

export default MapFilter;
