import React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from '../../src/components/LoginForm';

const mock = jest.fn();

describe('<LoginForm />', () => {
  it('should change inputs', () => {
    const form = shallow(
      <LoginForm
        onLogin={mock}
      />);
    const mockedEvent = { target: {} };
    expect(form.state('userId')).toBe('');
    expect(form.state('userNick')).toBe('');
    form.find('#userId').simulate('change', mockedEvent);
    expect(form.state('userId')).toBe(form.find('#userId').prop('value'));
    form.find('#userNick').simulate('change', mockedEvent);
    expect(form.state('userNick')).toBe(form.find('#userNick').prop('value'));
  });
});
