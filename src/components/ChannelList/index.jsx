import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-preloading-component';

import './index.scss';

export class ChannelList extends React.Component {
  handleItemClick = (e) => {
    this.props.selectedChan(e.target.id);
  }
  render() {
    return (
      <ul className="list channels-list">
        {
          this.props.fetching ?
            <div className="preloader">
              <Spinner
                color="#ffffff"
                secondaryColor="#40c9ff"
                size={50}
              />
            </div>
            :
            null
          }
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
                <span className="channel-item-name">{cur.name}</span>
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
  channels: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetching: PropTypes.bool.isRequired,
};
