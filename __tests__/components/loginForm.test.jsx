import React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from '../../src/components/LoginForm';
import { Form } from '../../src/components/UI/Form';

const mock = jest.fn();

const mockedEvent = { target: {}, preventDefault: () => {} };

describe('<LoginForm />', () => {
  it('should change inputs', () => {
    const form = shallow(
      <LoginForm
        onLogin={mock}
      />);
    expect(form.state('userId')).toBe('');
    expect(form.state('userNick')).toBe('');
    form.find('#userId').simulate('change', mockedEvent);
    expect(form.state('userId')).toBe(form.find('#userId').prop('value'));
    form.find('#userNick').simulate('change', mockedEvent);
    expect(form.state('userNick')).toBe(form.find('#userNick').prop('value'));
  });
  it('call login function on submit form', () => {
    const form = shallow(<LoginForm
      onLogin={mock}
    />);
    form.find(Form).simulate('submit', mockedEvent);
    const formData = {
      userId: form.state('userId'),
      userNick: form.state('userNick'),
    };
    expect(mock).toHaveBeenCalledWith(formData);
  });
});
