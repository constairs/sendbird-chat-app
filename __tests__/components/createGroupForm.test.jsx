import React from 'react';
import { shallow } from 'enzyme';

import { CreateGroupForm } from '../../src/components/CreateGroupForm';
import { UsersToInvite } from '../../src/components/UI/UsersToInvite';
import { Form } from '../../src/components/UI/Form';

const mock = jest.fn();
const mockEvent = { target: '', preventDefault: () => {} };

describe('<CreateGroupForm />', () => {
  it('should change inputs', () => {
    const form = shallow(<CreateGroupForm onSubmitForm={mock} />);
    expect(form.state('channelName')).toBe('');
    expect(form.state('coverUrl')).toBe('');
    expect(form.state('groupUsersInput')).toBe('');
    expect(form.state('customType')).toBe('');

    form.find('#channelName').simulate('change', mockEvent);
    form.find('#coverUrl').simulate('change', mockEvent);
    form.find('#groupUsers').simulate('change', mockEvent);
    form.find('#customType').simulate('change', mockEvent);

    expect(form.state('channelName')).toBe(form.find('#channelName').prop('value'));
    expect(form.state('coverUrl')).toBe(form.find('#coverUrl').prop('value'));
    expect(form.state('groupUsersInput')).toBe(form.find('#groupUsers').prop('value'));
    expect(form.state('customType')).toBe(form.find('#customType').prop('value'));
  });
  it('should change checkbox', () => {
    const form = shallow(<CreateGroupForm onSubmitForm={mock} />);
    expect(form.state('channelDistinct')).toBe(false);
    form.find('#channelDistinct').simulate('change', mockEvent);
    expect(form.state('channelDistinct')).toBe(form.find('#channelDistinct').prop('value'));
  });
  it('should add users to array', () => {
    const form = shallow(<CreateGroupForm onSubmitForm={mock} />);
    expect(form.state('usersToInvite')).toEqual([]);
    form.find('.invite-button').simulate('click');
    expect(form.state('usersToInvite').length).toBeGreaterThan(0);
  });
  it('should del user from array', () => {
    const form = shallow(<CreateGroupForm onSubmitForm={mock} />);
    form.setState({ usersToInvite: ['user', 'test'] });
    form.find(UsersToInvite).find('li:first-child button').simulate('click', { target: { id: 'user' } });
    expect(form.state('usersToInvite')).toHaveLength(1);
  });
  it('should call onSubmitForm', () => {
    const form = shallow(<CreateGroupForm onSubmitForm={mock} />);
    form.find(Form).simulate('submit', mockEvent);
    const formData = [
      form.state('usersToInvite'),
      form.state('channelDistinct'),
      form.state('channelName'),
      form.state('coverUrl'),
      form.state('coverFile'),
      form.state('channelData'),
      form.state('customType'),
    ];
    expect(mock).toHaveBeenCalledWith(formData);
  });
});
