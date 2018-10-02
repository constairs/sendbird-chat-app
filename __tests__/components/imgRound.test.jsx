import React from 'react';
import { shallow } from 'enzyme';

import { ImgWrap } from '../../src/components/ImgRound';
import { Button } from '../../src/components/UI/Button';

const mock = jest.fn();

describe('<ImgRound />', () => {
  it('should click button', () => {
    const wrapper = shallow(
      <ImgWrap
        src="https/url.com/"
        btn
        btnTitle="change"
        onClickBtn={mock}
        additionalTitle="Change profile data"
      />);
    wrapper.find(Button).simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});
