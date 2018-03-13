import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    renderOutside: PropTypes.func,
  }
  static defaultProps = {
    renderOutside: (x) => x,
  }

  render() {
    return (
      <Container>
        <Content>{this.props.children}</Content>
        {this.props.renderOutside()}
      </Container>
    )
  }
}

// position: absolute;
// width: 100%;
// height: 100%;
const Container = styled.div`
  background: rgba(110, 31, 255, 0.65);
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  ${({ theme }) => {
    return `
      background: ${'#fff' || theme.colors.white};
      font-size: ${'22px' || theme.fontSizes.large};
      min-width: 340px;
      min-height: 140px;
      text-align: center;
    `
  }};
`
export default Modal
// ReactDOM.render(<Modal />, document.getElementById('react-modal-container'))
