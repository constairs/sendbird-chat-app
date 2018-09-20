import React from 'react';
import { shallow } from 'enzyme';

import { UserForm } from '../../src/components/UserForm';

const mock = jest.fn();
const mockEvent = {
  target: {},
  preventDefault: () => {}
};

describe('<LoginForm />', () => {
  it('should change inputs', () => {
    const form = shallow(
      <UserForm
        onChangeProfile={mock}
      />);
    const mockedEvent = { target: {} };
    expect(form.state('userImg')).toBe('');
    expect(form.state('userNick')).toBe('');
    form.find('#userImg').simulate('change', mockedEvent);
    expect(form.state('userImg')).toBe(form.find('#userImg').prop('value'));
    form.find('#userNick').simulate('change', mockedEvent);
    expect(form.state('userNick')).toBe(form.find('#userNick').prop('value'));
  });
  it('should call onChangeProfile', () => {
    const form = shallow(
      <UserForm
        onChangeProfile={mock}
      />);
    form.find('form').simulate('submit', mockEvent);
    expect(mock).toHaveBeenCalledWith([form.state('userNick'), form.state('userImg')]);
  });
});
