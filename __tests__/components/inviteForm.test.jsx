import React from 'react';
import { shallow } from 'enzyme';

import { InviteForm } from '../../src/components/InviteForm';
import { UsersToInvite } from '../../src/components/UI/UsersToInvite';
import { Button } from '../../src/components/UI/Button';

const mock = jest.fn();

const mockEvent = {
  target: {},
  preventDefault: () => {},
};

describe('<InviteForm />', () => {
  it('should change input', () => {
    const form = shallow(<InviteForm onInviteUsers={mock} />);
    expect(form.state('usersIdsInput')).toBe('');
    form.find('#userId').simulate('change', mockEvent);
    expect(form.state('usersIdsInput')).toBe(form.find('#userId').prop('value'));
  });
  it('should add users to array', () => {
    const form = shallow(<InviteForm onInviteUsers={mock} />);
    expect(form.state('usersToInvite')).toEqual([]);
    form.find('.invite-button').simulate('click');
    expect(form.state('usersToInvite').length).toBeGreaterThan(0);
  });
  it('should del user from array', () => {
    const form = shallow(<InviteForm onInviteUsers={mock} />);
    form.setState({ usersToInvite: ['user', 'test'] });
    expect(form.find(UsersToInvite)).toExist();
    form.find(UsersToInvite).find('li:first-child').find(Button).simulate('click', { target: { id: 'user' } });
    expect(form.state('usersToInvite')).toHaveLength(1);
  });
  // it('should call onInviteUsers', () => {
  //   const form = shallow(<InviteForm onInviteUsers={mock} />);
  //   form.simulate('onSubmit', mockEvent);
  //   expect(mock).toHaveBeenCalled();
  // });
});
