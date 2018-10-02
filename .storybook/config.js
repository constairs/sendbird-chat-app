import { configure } from '@storybook/react';
import 'storybook-addon-jsx/register';

function loadStories() {
  require('../src/components/stories/index.jsx');
}

configure(loadStories, module);