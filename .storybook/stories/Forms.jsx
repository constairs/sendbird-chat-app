import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';

import { Button } from '../../src/components/UI/Button';
import { Form } from '../../src/components/UI/Form';
import { Input } from '../../src/components/UI/Input';

export const Forms = storiesOf('Modal Form', module)
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