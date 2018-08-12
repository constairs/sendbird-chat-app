import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

export class Modal extends React.Component {

  handleModalClose = () => {
    this.props.onClose();
  }

  render() {
    return (
      <div className="modal-wrap">
        <div className="modal">
          <button className="x-btn" onClick={this.handleModalClose}>x</button>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired
};

