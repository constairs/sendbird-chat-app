import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Spinner } from 'react-preloading-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSignOutAlt, faFile, faTimes, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../src/components/UI/Button';
import { Preloader } from '../../src/components/UI/Preloader';

export const Buttons = storiesOf('Buttons', module)
.addDecorator(withKnobs)
.addWithJSX('with text', () => (
  <Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>
    {text('Label', 'Text')}
  </Button>
))
.addWithJSX('with preloader', () => (
  <Button onClick={action('clicked')}>
    <span>
      <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
    </span>
  </Button>
))
.addWithJSX('with logout icon', () => (
  <Button onClick={action('clicked')}>
    <FontAwesomeIcon icon={faSignOutAlt} />
  </Button>
))
.addWithJSX('with close icon', withNotes('Some note')(() => (
  <Button onClick={action('clicked')}>
    <FontAwesomeIcon icon={faTimes} />
  </Button>
)))
.addWithJSX('disabled', () => (
  <Button disabled>
    Disabled
  </Button>
));