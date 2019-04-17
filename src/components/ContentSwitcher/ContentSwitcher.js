import React from 'react'
import styled, { css } from 'styled-components'
import { colors } from 'colors'
import { rem } from 'polished'

const SwitcherItem = styled.span`
  color: ${colors.primary};
  padding: ${rem(4)} ${rem(8)};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${props => props.active && css`  
    background-color: ${colors.primaryLighter};
    border-radius: ${rem(4)};
  `}
`

class ContentSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.updateActive = this.updateActive.bind(this);
  }

  /**
   * Updates the active state of the nav bar item
   * @param {active} active the active item
   */
  updateActive(active) {
    this.props.action(active);
  }

  /**
   * Creates a list of options
   */
  createOptions() {
    const options = [];
    for (let option of this.props.options) {
      options.push(
        <SwitcherItem
          key={option.value}
          active={option.active}
          onClick={() => {this.updateActive(option.value)}}>
          {option.name}
        </SwitcherItem>
      );
    }
    return options;
  }

  render() {
    return (
      <div className="content-switcher">
        {this.createOptions()}
      </div>
    )
  }
}

export default ContentSwitcher;
