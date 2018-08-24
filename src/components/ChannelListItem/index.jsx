import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecentlyMessages } from '../../redux/openChannels/actions';

export class ListItem extends React.Component {
  componentDidMount() {
    this.props.dispatch(getRecentlyMessages([this.props.cur.url, 1]));
  }

  handleItemClick = () => {
    this.props.selectedChan(this.props.cur.url);
  };

  render() {
    return (
      <li>
        <button onClick={this.handleItemClick}>
          <div className="channel-info">
            <span className="img">
              <img
                src={
                  this.props.cur.coverUrl
                    ? this.props.cur.coverUrl
                    : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'
                }
                alt={this.props.cur.name}
              />
            </span>
            <span className="channel-item-name">{this.props.cur.name}</span>
          </div>
          {this.props.cur.messages ? (
            <ul className="recently-messages">
              Последнее сообщение:
              {this.props.cur.messages.map(cur => (
                <li key={cur.messageId}>{cur.customType}</li>
              ))}
            </ul>
          ) : (
            <span>загрузка...</span>
          )}
        </button>
      </li>
    );
  }
}

ListItem.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  cur: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    openChannels: state.openChannelsReducer,
  };
}

export const ChannelListItem = connect(mapStateToProps)(ListItem);
