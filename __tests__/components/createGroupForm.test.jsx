import React from 'react';
import { shallow } from 'enzyme';

import { CreateGroupForm } from '../../src/components/CreateGroupForm';

const mock = jest.fn();
const mockEvent = { target: '' };

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
});
