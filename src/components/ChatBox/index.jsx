import React from 'react';

export class ChatBox extends React.Component {
  handleUpdateClick = () => {
    this.props.onUpdateChat();
  }
  render() {
    return (
      <div className="chat">
        {
          this.props.messages.map((cur) => {
            return (<div>{cur}</div>);
          })
        }
        <button onClick={this.handleUpdateClick}>Обновить</button>
      </div>
    );
  }
}