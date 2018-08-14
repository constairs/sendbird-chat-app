import React from 'react';

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

  handleSubmit = (e) => {
    e.preventDefault();
    const messageData = [
      this.props.channel.url,
      'MESG',
      this.props.user.userId,
      this.state.message,
    ];
    console.log(messageData);
    this.props.onMessageSend(messageData);
  }

  render() {
    const { name, participantCount } = this.props.channel;
    return (
      <div className="channel-item">
        <h1>{name}</h1>
        <p>{participantCount}</p>
        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleTextInput} value={this.state.message} />
          <button>Отправить</button>
        </form>
      </div>
    );
  }
}
