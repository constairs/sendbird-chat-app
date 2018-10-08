import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';
import { Spinner } from 'react-preloading-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../src/components/UI/Button';
import { FileLoadingSpinner } from '../../src/components/UI/FileLoadingSpinner';
import { Preloader } from '../../src/components/UI/Preloader';

export const Preloaders = storiesOf('Preloaders', module)
  .addWithJSX('Preloader', withMarkdownNotes(`
  # Preloader
  `)(() => (
    <Preloader />
  )
  ))
  .addWithJSX('File uploading preloader', withMarkdownNotes(`
  # File Uploading Preloader 
  `)(() => (
    <FileLoadingSpinner>
      <Spinner color="#ffffff" secondaryColor="#40c9ff" size={70} />
      <span className="loading-progress">60 %</span>
    </FileLoadingSpinner>
  )))
  .addWithJSX('File preloader cancel loading', withMarkdownNotes(`
  # File Preloader
  With Cancel Btn
  `)(() => (
    <FileLoadingSpinner>
      <Spinner color="#ffffff" secondaryColor="#40c9ff" size={70} />
      <Button onClick={action('clicked')} className="cancel-button">
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </FileLoadingSpinner>
  )));