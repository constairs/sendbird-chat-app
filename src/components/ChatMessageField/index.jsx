import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Spinner, Text } from 'react-preloading-component';
import * as chatActions from '../../redux/chat/actions';

class MessageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleTextInput = (e) => {
    this.setState({ message: e.target.value }, () => {
      this.props.chatActions.onMessageTyping([
        this.props.channelUrl,
        this.props.user.userName,
        this.state.message,
      ]);
    });
  };

  // handleFocusInput = () => {
  //   this.props.chatActions.onMessageTyping([
  //     this.props.currentChannel.url,
  //     this.props.user.userName,
  //   ]);
  // };

  // handleBlurInput = () => {
  //   this.props.chatActions.onMessageTyping([this.props.currentChannel.url, '']);
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channelUrl,
      'MESG',
      this.props.user.userId,
      this.state.message,
    ];
    this.setState({ message: '' });
    this.props.chatActions.sendMessage(messageData);
  };

  render() {
    return (
      <form className="chat-message-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          // onChange={this.handleTextInput}
          onInput={this.handleTextInput}
          value={this.state.message}
        />
        {this.props.userTyping &&
        this.props.userTyping !== this.props.user.userName ? (
          <span className="typing-indicator">
            {this.props.userTyping}
            <Text color="#000000" fontSize="1em" text="набирает сообщение" />
          </span>
        ) : null}
        <button className="send-message-btn" disabled={!this.state.message}>
          Отправить
          {this.props.sendingMessage ? (
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
          ) : null}
        </button>
      </form>
    );
  }
}

MessageField.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  channelUrl: PropTypes.string.isRequired,
  userTyping: PropTypes.string.isRequired,
  sendingMessage: PropTypes.bool.isRequired,
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    channelUrl: state.openChannelsReducer.channel.url,
    userTyping: state.chatReducer.userTyping,
    sendingMessage: state.chatReducer.sendingMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(chatActions, dispatch),
  };
}
export const ChatMessageField = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageField);
