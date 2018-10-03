import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-preloading-component';
import { Button } from '../UI/Button';
import { FileLoadingSpinner } from '../UI/FileLoadingSpinner';

export class FilePreloader extends React.Component {
  handleCancelUploading = () => {
    this.props.onCancelUploading();
  };

  render() {
    const { progress } = this.props;
    return (
      <FileLoadingSpinner>
        <Spinner color="#ffffff" secondaryColor="#40c9ff" size={70} />
        <span className="loading-progress">{progress} %</span>
        {progress < 100 ? (
          <Button onClick={this.handleCancelUploading} className="cancel-button">
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          ) : null}
      </FileLoadingSpinner>
    );
  }
}

FilePreloader.propTypes = {
  progress: PropTypes.number.isRequired,
  onCancelUploading: PropTypes.func.isRequired,
};
