import React from 'react';
import { addDecorator } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/theme/theme';

addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

import {Buttons} from './Buttons';
import {FilePreviews} from './FilePreviews';
import {Preloaders} from './Preloaders';
import {Forms} from './Forms';
import {UsersToInviteItem} from './UsersToInviteItem';
