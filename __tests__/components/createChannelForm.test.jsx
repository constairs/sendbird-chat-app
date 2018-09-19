import React from 'react';
import { shallow } from 'enzyme';

import { CreateChannelForm } from '../../src/components/CreateChannelForm';


const mock = jest.fn();

describe('<CreateChannelForm />', () => {
  it('should change inputs', () => {
    const form = shallow(
      <CreateChannelForm
        onSubmitForm={mock}
      />);
    const mockedEvent = { target: {} };
    expect(form.state('channelName')).toBe('');
    expect(form.state('coverUrl')).toBe('');
    expect(form.state('channelData')).toBe('');
    expect(form.state('customType')).toBe('');

    form.find('#channelName').simulate('change', mockedEvent);
    expect(form.state('channelName')).toBe(form.find('#channelName').prop('value'));
    form.find('#coverUrl').simulate('change', mockedEvent);
    expect(form.state('coverUrl')).toBe(form.find('#coverUrl').prop('value'));
    form.find('#customType').simulate('change', mockedEvent);
    expect(form.state('customType')).toBe(form.find('#customType').prop('value'));
  });
});
