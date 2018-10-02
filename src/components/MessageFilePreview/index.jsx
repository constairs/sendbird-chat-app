import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import LazyLoad from 'react-lazyload';
import { Spinner } from 'react-preloading-component';
import styled from 'styled-components';
import { FilePreview } from '../../components/UI/FilePreview';

export const StyledFilePreview = styled(FilePreview)`
    margin-right: 10px;
    margin-bottom: 0;
`;

export const MessageFilePreview = ({ ...props }) => {
  const { customType, url, name } = props;
  return (
    <StyledFilePreview>
      {customType === '' ? (
        <FontAwesomeIcon icon={faFile} />
    ) : (
      <div>
        {
          customType === 'IMAGE' ?
            <LazyLoad height="100%" placeholder={<Spinner color="#ffffff" secondaryColor="#40c9ff" size={30} />} offset={100}>
              <img src={url} alt={name} />
            </LazyLoad>
          :
            (
              <div>
                {
                  customType === 'AUDIO' ?
                    <FontAwesomeIcon icon={faFileAudio} />
                  :
                    <FontAwesomeIcon icon={faFileVideo} />
                }
              </div>
            )
        }
      </div>
    )}
    </StyledFilePreview>
  );
};

MessageFilePreview.propTypes = {
  customType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
