import React from 'react';

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

