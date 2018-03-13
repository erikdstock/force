import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import Modal from '../modal'
import mediator from '../../../lib/mediator.coffee'

class AuthModal extends React.Component {
  render() {
    return (
      <Modal>
        <Container>
          <h1> GOT TO SIGN IN!</h1>
        </Container>
      </Modal>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: #ff00ff;
  height: 100%;
  height: 200px;
`
mediator.on('open:auth', () => {
  console.log('opening react auth modal')
  ReactDOM.render(
    <AuthModal />,
    document.getElementById('react-modal-container')
  )
})
