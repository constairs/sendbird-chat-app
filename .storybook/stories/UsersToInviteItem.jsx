import React from 'react';
import { storiesOf } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { action } from '@storybook/addon-actions';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../src/components/UI/Button';

import { UsersToInvite } from '../../src/components/UI/UsersToInvite';

export const UsersToInviteItem = storiesOf('UsersToInvite', module)
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