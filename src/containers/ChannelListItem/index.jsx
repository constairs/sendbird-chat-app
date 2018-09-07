import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecentlyMessages } from '../../redux/openChannels/actions';

export class ListItem extends React.Component {
  componentDidMount() {
    this.props.dispatch(getRecentlyMessages([this.props.channelItem.url, 1]));
  }

  handleItemClick = () => {
    this.props.selectedChan({
      channelUrl: this.props.channelItem.url,
      channelType: this.props.channelItem.channelType,
    });
  };

  render() {
    const { channelItem } = this.props;
    return (
      <li>
        <button className="channel-list-item" onClick={this.handleItemClick}>
          <div className="channel-info">
            <span className="img">
              <img
                src={
                  channelItem.coverUrl ||
                  'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={channelItem.name}
              />
            </span>
            <span className="channel-item-name">{channelItem.name}</span>
          </div>
          {channelItem.messages && channelItem.messages.length > 0 ? (
            <ul className="recently-messages">
              Последнее сообщение:
              {channelItem.messages.map(message => (
                <li key={message.messageId}>{message.message}</li>
              ))}
            </ul>
          ) : null}
        </button>
      </li>
    );
  }
}

ListItem.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channelItem: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    openChannels: state.openChannelsReducer,
  };
}

export const ChannelListItem = connect(mapStateToProps)(ListItem);
