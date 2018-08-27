import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Spinner } from 'react-preloading-component';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import * as openChannelsActions from '../../redux/openChannels/actions';
import * as groupChannelsActions from '../../redux/groupChannels/actions';
import { CreateChannelForm } from '../../components/CreateChannelForm';
import { CreateGroupForm } from '../../components/CreateGroupForm';
import { ChannelList } from '../../components/ChannelList';
import { Channel } from '../../components/Channel';

class OpenChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      groupChModal: false,
    };
  }

  handleOpenChannel = (formData) => {
    this.props.openChannelsActions.createOpenChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleGroupChannel = (formData) => {
    this.props.groupChannelsActions.createGroupChannel(formData);
    this.setState({ modalIsOpen: false });
  };

  handleEnterChannel = (channelUrl) => {
    this.props.openChannelsActions.enterChannel(channelUrl);
  };

  handleLeaveChannel = (channelUrl) => {
    this.props.openChannelsActions.leaveChannel(channelUrl);
  };

  handleOpenModal = (e) => {
    const name = e.target.name;
    if (name === 'createOpen') {
      this.setState({ groupChModal: false, modalIsOpen: true });
    } else {
      this.setState({ groupChModal: true, modalIsOpen: true });
    }
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { channelsList, channel } = this.props.openChannels;
    return (
      <div className="page channel-page">
        {this.props.openChannels.fetching || this.props.user.userFetching ? (
          <div className="preloader">
            <Spinner color="#ffffff" secondaryColor="#40c9ff" size={100} />
          </div>
        ) : null}
        <div className="flex-container">
          <div className="channel-sidebar">
            <button name="createOpen" onClick={this.handleOpenModal}>
              Создать открытый канал
            </button>
            {channelsList ? (
              <ChannelList
                selectedChan={this.handleEnterChannel}
                channels={channelsList}
                fetching={this.props.openChannels.fetching}
              />
            ) : null}
            <button name="createGroup" onClick={this.handleOpenModal}>
              Создать групповой канал
            </button>
          </div>
          {channel ? (
            <Channel
              onEnter={this.handleEnterChannel}
              onLeave={this.handleLeaveChannel}
              user={this.props.user}
              channel={channel}
              participants={this.props.openChannels.participants}
            />
          ) : null}
        </div>
        <Modal
          className="modal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          ariaHideApp={false}
          groupChModal
        >
          <button className="x-btn" onClick={this.closeModal}>
            x
          </button>

          {this.state.groupChModal ? (
            <CreateChannelForm onSubmitForm={this.handleOpenChannel} />
          ) : (
            <CreateGroupForm onSubmitForm={this.handleGroupChannel} />
          )}
        </Modal>
      </div>
    );
  }
}

OpenChannel.propTypes = {
  openChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  groupChannelsActions: PropTypes.objectOf(PropTypes.func).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  openChannels: PropTypes.objectOf(PropTypes.any).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.persistedUserReducer,
    openChannels: state.openChannelsReducer,
    groupChannels: state.groupChannelsReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openChannelsActions: bindActionCreators(openChannelsActions, dispatch),
    groupChannelsActions: bindActionCreators(groupChannelsActions, dispatch),
  };
}

export const OpenChannelsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenChannel);