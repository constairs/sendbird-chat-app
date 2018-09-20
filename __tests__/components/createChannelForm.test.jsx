import React from 'react';
import { shallow } from 'enzyme';

import { CreateChannelForm } from '../../src/components/CreateChannelForm';


const mock = jest.fn();
const mockedEvent = { target: {}, preventDefault: () => {} };

describe('<CreateChannelForm />', () => {
  it('should change inputs', () => {
    const form = shallow(
      <CreateChannelForm
        onSubmitForm={mock}
      />);
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
  it('should call onSubmitForm', () => {
    const form = shallow(
      <CreateChannelForm onSubmitForm={mock} />
    );
    form.find('form').simulate('submit', mockedEvent);
    const formData = [
      form.state('channelName'),
      form.state('coverUrl'),
      form.state('coverFile'),
      form.state('channelData'),
      form.state('customType'),
    ];
    expect(mock).toHaveBeenLastCalledWith(formData);
  });
});
