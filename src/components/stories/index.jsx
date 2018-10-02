import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { Spinner } from 'react-preloading-component';
import { Button } from '../UI/Button';

setAddon(JSXAddon);

storiesOf('Button', module)
  .addWithJSX('with text', () => (
    <Button>
      Text
    </Button>
  ))
  .addWithJSX('with preloader', () => (
    <Button>
      <span>
        <Spinner color="#ffffff" secondaryColor="#40c9ff" size={10} />
      </span>
    </Button>
  ));
