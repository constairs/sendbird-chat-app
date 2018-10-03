import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from 'react-preloading-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { action } from '@storybook/addon-actions';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';
import { faSignOutAlt, faFile, faTimes, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../UI/Button';
import { FilePreview } from '../UI/FilePreview';
import { MessageFilePreview } from '../MessageFilePreview';
import { Form } from '../UI/Form';
import { Input } from '../UI/Input';
import { Preloader } from '../UI/Preloader';


storiesOf('Buttons', module)
  .addWithJSX('with text', () => (
    <Button onClick={action('clicked')}>
      Text
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

storiesOf('FilePreview', module)
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
      <Spinner color="#ffffff" secondaryColor="#40c9ff" size={30} />
    </MessageFilePreview>
  ));


storiesOf('Modal Form', module)
  .addWithJSX('form with labels', withMarkdownNotes(`
  # Modal Form
  `)(() => (
    <Form>
      <label htmlFor="text">
        <span>text input</span>
        <Input id="text" />
      </label>
      <label htmlFor="checkbox">
        <Input id="checkbox" type="checkbox" /> checkbox
      </label>
      <Button>Submit</Button>
    </Form>
  )
  ));

storiesOf('preloader', module)
  .addWithJSX('preloader', withMarkdownNotes(`
  # Preloader
  `)(() => (
    <Preloader />
  )
  ));
