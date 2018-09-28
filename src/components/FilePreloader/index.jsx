import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-preloading-component';
import styled from 'styled-components';

export class FilePreloader extends React.Component {
  handleCancelUploading = () => {
    this.props.onCancelUploading();
  };

  render() {
    const { progress } = this.props;
    return (
      <Preloader>
        <Spinner color="#ffffff" secondaryColor="#40c9ff" size={70} />
        <span className="loading-progress">{progress} %</span>
        {progress < 100 ? (
          <button onClick={this.handleCancelUploading} className="cancel-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          ) : null}
      </Preloader>
    );
  }
}

export const Preloader = styled.div`
  width: 80px;
  min-width: 80px;
  height: 80px;
  position: relative;
  .loading-progress {
    font-size: 14px;
    text-align: center;
    position: absolute;
    display: block;
    top: 30px;
    left: 22px;
    color: ${props => props.theme.colors.main};
    font-size: 16px;
  }
  .PreLoading-Spinner {
    position: absolute;
    top: 0;
    right: 0;
  }
  &:hover {
    .cancel-button {
      opacity: 1;
    }
  }
  .cancel-button {
    opacity: 0;
    background-color: ${props => props.theme.colors.main};
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    font-size: 20px;
    transition: all .2s
  }
`;

FilePreloader.propTypes = {
  progress: PropTypes.number.isRequired,
  onCancelUploading: PropTypes.func.isRequired,
};
