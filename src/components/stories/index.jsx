import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { Spinner } from 'react-preloading-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { faSignOutAlt, faFile, faTimes, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../UI/Button';
import { FilePreview } from '../UI/FilePreview';
import { MessageFilePreview } from '../MessageFilePreview';
import { Form } from '../UI/Form';
import { Input } from '../UI/Input';
import { Preloader } from '../UI/Preloader';
import { FileLoadingSpinner } from '../UI/FileLoadingSpinner';
import { UsersToInvite } from '../UI/UsersToInvite';
import { theme } from '../../theme/theme';


addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

storiesOf('Buttons', module)
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
      <div>
        <Spinner color="#ffffff" secondaryColor="#40c9ff" size={30} />
      </div>
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

storiesOf('Preloaders', module)
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

storiesOf('UsersToInvite', module)
  .addWithJSX('user item', withMarkdownNotes(`
    #User Item
    User to invite item
  `)(() => (
    <UsersToInvite>
      <li>
        Nickname
        <Button onClick={action('clicked')} type="button">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </li>
    </UsersToInvite>
  )));
