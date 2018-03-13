import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
  render() {
    return <div>Hello from React</div>
  }
}

ReactDOM.render(<Modal />, document.getElementById('react-modal-container'))
