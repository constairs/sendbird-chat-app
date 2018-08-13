import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { CreateChannelForm } from '../../components/CreateChannelForm';

import './index.css';

class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleOpenChannel = (formData) => {
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
        {/* {this.props.chat.fetching ?
          <div className="preloader">
            <Spinner
              color="#80f0c1"
              secondaryColor="#f7a2c9"
              size="200"
            />
          </div>
          : null
        } */}
        { this.state.modalOpen ?
          <div className="modal">
            <button className="x-btn" onClick={this.handleCloseModal}>x</button>
            <CreateChannelForm onCreateChannel={this.handleOpenChannel} />
          </div>
          :
          null
        }
        <button onClick={this.handleOpenModal}>Создать открытый канал</button>
      </div>
    );
  }
}

OpenChannel.propTypes = {
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired
};

function mapStateToProps(state) {
  return {
    chat: state.chatReducer
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
