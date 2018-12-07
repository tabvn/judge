import React, { Component } from 'react'
import M from 'react-modal'
import PropTypes from 'prop-types'

export default class Modal extends Component {

  handleModalCloseRequest = () => {
    this.setState({modalIsOpen: false}, () => {
      if (this.props.onClose) {
        this.props.onClose()
      }
    })
  }

  render () {
    const {title, open} = this.props
    return (
      <div>
        <M
          ariaHideApp={false}
          className="Modal__Bootstrap modal-dialog"
          closeTimeoutMS={150}
          isOpen={open ? open : false}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              {title && <h4 className="modal-title">{title}</h4>}
              <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                <i className={'md-icon'}>close</i>
              </button>
            </div>
            <div className="modal-body">
              {
                this.props.children
              }
            </div>
          </div>
        </M>
      </div>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.any,
}

Modal.defaultProps = {
  open: false,
  title: null
}
