import React from 'react';
import PropTypes from 'prop-types';

export class ChannelList extends React.Component {
  handleItemClick = (e) => {
    this.props.selectedChan(e.target.id);
  }
  render() {
    return (
      <ul className="list channels-list">
        {
          this.props.channels.map(cur =>
            (
              <li key={cur.createdAt}>
                <span className="img">
                  <img src={cur.coverUrl ? cur.coverUrl : 'http://dxstmhyqfqr1o.cloudfront.net/images/icon-chat-04.png'} alt={cur.name} />
                </span>
                <button id={cur.url} onClick={this.handleItemClick}>
                  Войти
                </button>
                {cur.name}
              </li>
            )
          )
        }
      </ul>
    );
  }
}

ChannelList.propTypes = {
  selectedChan: PropTypes.func.isRequired,
  channels: PropTypes.arrayOf(PropTypes.any).isRequired
};
