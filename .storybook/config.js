import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

setAddon(JSXAddon);

function loadStories() {
  require('../src/components/stories/index.jsx');
}

configure(loadStories, module);
