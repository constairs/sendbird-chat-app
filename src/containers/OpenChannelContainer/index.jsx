import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chatActions from '../../redux/chat/actions';
import { Modal } from '../../components/Modal';

import './index.css';

class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      channelName: '',
      imgUrl: '',
      channelData: ''
    };
  }

  handleInput = (e) => {
    const curInput = e.target;
    if (curInput.name === 'channelName') {
      this.setState({ channelName: curInput.value });
    }
    if (curInput.name === 'imgUrl') {
      this.setState({ imgUrl: curInput.value });
    }
    if (curInput.name === 'channelData') {
      this.setState({ channelData: curInput.value });
    }
  }

  handleOpenChannel = (e) => {
    e.preventDefault();
    const formData = {
      channelName: this.state.channelName,
      imgUrl: this.state.imgUrl,
      channelData: this.state.channelData
    };
    this.setState({ 
      channelData: '',
      channelName: '',
      imgUrl: ''
    });
    this.props.chatActions.createOpenChannel(formData);
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div className="page channel-page">
        { this.state.modalOpen ?
          <div className="modal">
            <button className="x-btn" onClick={this.handleCloseModal}>x</button>
            <form className="form login-form" onSubmit={this.handleOpenChannel}>
              <input name="channelName" value={this.state.channelName} onChange={this.handleInput} type="text" />
              <input name="imgUrl" value={this.state.imgUrl} onChange={this.handleInput} type="text" />
              <input name="channelData" value={this.state.channelData} onChange={this.handleInput} type="text" />
              <button>Создать</button>
            </form>
          </div>
          :
          null
        }
        <button onClick={this.handleOpenModal}>Создать открытый канал</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chat: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch)
  };
}

export const OpenChannelContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannel);
