import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as openChannelsActions from '../../redux/openChannels/actions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';


class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  handleOpenChannel = (formData) => {
    this.props.openChannelsActions.createOpenChannel(formData);
    this.setState({ modalIsOpen: false });
    this.props.openChannelsActions.openChannelsList();
  }

  handleEnterChannel = (channelUrl) => {
    this.props.openChannelsActions.enterChannel(channelUrl);
  }

  handleLeaveChannel = (channelUrl) => {
    this.props.openChannelsActions.leaveChannel(channelUrl);
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { channelsList, channel } = this.props.openChannels;
    return (
      <div className="page channel-page">
        {
          this.props.openChannels.fetching || this.props.user.fetching ?
            <div className="preloader">
              <Spinner
                color="#ffffff"
                secondaryColor="#40c9ff"
                size={100}
              />
            </div>
          : null
        }
        <button onClick={this.handleOpenModal}>Создать открытый канал</button>
        <div className="flex-container">
          { channelsList ?
            <ChannelList selectedChan={this.handleEnterChannel} channels={channelsList} />
            :
            null
          }
          { channel ?
            <Channel
              onEnter={this.handleEnterChannel}
              onLeave={this.handleLeaveChannel}
              user={this.props.user}
              channel={channel}
              participants={this.props.openChannels.participants}
            />
          :
            null
          }
        </div>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button className="x-btn" onClick={this.closeModal}>x</button>
          <CreateChannelForm onSubmitForm={this.handleOpenChannel} />
        </Modal>
      </div>
    );
  }
}

OpenChannel.propTypes = {
  openChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  openChannels: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    openChannels: state.openChannelsReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openChannelsActions: bindActionCreators(openChannelsActions, dispatch)
  };
}

export const OpenChannelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannel);
