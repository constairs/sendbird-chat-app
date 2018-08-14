import React from 'react';
import { ChatBox } from '../ChatBox';

export class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  handleTextInput = (e) => {
    this.setState({ message: e.target.value });
  }

  updateChannelChat = () => {
    this.props.onUpdateChannelChat(this.props.channel.url);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channel.url,
      'MESG',
      this.props.user.userId,
      this.state.message,
    ];
    this.props.onMessageSend(messageData);
  }

  handleGetMessages = () => {
    this.props.onGetMessage(this.props.channel.url);
  }

  componentDidMount() {
    this.handleGetMessages(this.props.channel.url);
  }

  render() {
    const { name, participantCount } = this.props.channel;
    return (
      <div className="channel-item">
        <h1>{name}</h1>
        <p>{participantCount}</p>
        {this.props.messages ?
          <ChatBox messages={this.props.messages} onUpdateChat={this.updateChannelChat} />
          :
          null
        }
        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleTextInput} value={this.state.message} />
          <button>Отправить</button>
        </form>
      </div>
    );
  }
}
