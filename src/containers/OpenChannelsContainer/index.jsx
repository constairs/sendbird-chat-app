import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import * as chatActions from '../../redux/chat/actions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';

class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  handleOpenChannel = (formData) => {
    this.props.chatActions.createOpenChannel(formData);
    this.setState({ modalOpen: false });
    this.props.chatActions.openChannelsList();
  }

  handleEnterChannel = (channelUrl) => {
    this.props.chatActions.enterChannel(channelUrl);
  }

  handleLeaveChannel = (channelUrl) => {
    this.props.chatActions.leaveChannel(channelUrl);
  }

  handleMessageSend = (messageData) => {
    this.props.chatActions.sendMessage(messageData);
  }

  heandleGetMessages = (channelUrl) => {
    this.props.chatActions.getMessages(channelUrl);
  }

  handleOpenModal = () => {
    this.setState({ modalOpen: true });
  }

  handleCloseModal = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const {
      channelsList,
      channel,
      messages,
      sendingMessage
    } = this.props.chat;
    return (
      <div className="page channel-page">
        {
          this.props.chat.fetching || this.props.user.fetching ?
            <div className="preloader">
              <Spinner
                color="#ffffff"
                secondaryColor="#40c9ff"
                size={100}
              />
            </div>
          : null
        }
        { this.state.modalOpen ?
          <div className="modal-wrap">
            <div className="modal">
              <button className="x-btn" onClick={this.handleCloseModal}>x</button>
              <CreateChannelForm onSubmitForm={this.handleOpenChannel} />
            </div>
          </div>
          :
          null
        }
        <button onClick={this.handleOpenModal}>Создать открытый канал</button>
        { channelsList ?
          <ChannelList selectedChan={this.handleEnterChannel} channels={channelsList} />
          :
          null
        }
        { channel ?
          <Channel
            onMessageSend={this.handleMessageSend}
            onGetMessages={this.heandleGetMessages}
            onEnter={this.handleEnterChannel}
            onLeave={this.handleLeaveChannel}
            user={this.props.user}
            channel={channel}
            messages={messages}
            sendingMessage={sendingMessage}
          />
        :
          null
        }
      </div>
    );
  }
}

OpenChannel.propTypes = {
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
  chat: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    chat: state.chatReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
}

export const OpenChannelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannel);
