import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Spinner } from 'react-preloading-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FilePreview } from '../../src/components/UI/FilePreview';
import { MessageFilePreview } from '../../src/components/MessageFilePreview';

import { faFile, faTimes, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../src/components/UI/Button';
import { Preloader } from '../../src/components/UI/Preloader';

export const FilePreviews = storiesOf('FilePreview', module)
.addWithJSX('doc/file', () => (
  <FilePreview>
    <FontAwesomeIcon icon={faFile} />
  </FilePreview>
))
.addWithJSX('audio', () => (
  <FilePreview>
    <FontAwesomeIcon icon={faFileAudio} />
  </FilePreview>
))
.addWithJSX('video', () => (
  <FilePreview>
    <FontAwesomeIcon icon={faFileVideo} />
  </FilePreview>
))
.addWithJSX('with delete btn', () => (
  <FilePreview>
    <Button onClick={action('clicked')}>
      <FontAwesomeIcon icon={faTimes} />
    </Button>
    <FontAwesomeIcon icon={faFileVideo} />
  </FilePreview>
))
.addWithJSX('with preloader', () => (
  <MessageFilePreview customType="IMAGE">
    <div>
      <Spinner color="#ffffff" secondaryColor="#40c9ff" size={30} />
    </div>
  </MessageFilePreview>
));