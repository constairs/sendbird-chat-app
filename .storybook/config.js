import { configure, setAddon, addDecorator } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import {withThemesProvider} from 'storybook-addon-styled-component-theme';
import {theme, theme1, theme2} from '../src/theme/theme';

addDecorator(withThemesProvider([theme1, theme2]));

setAddon(JSXAddon);

function loadStories() {
  require('./stories/index.jsx');
}

configure(loadStories, module);
