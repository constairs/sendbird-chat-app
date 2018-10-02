import React from 'react';
import { shallow } from 'enzyme';

import { ImgWrap } from '../../src/components/ImgRound';

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
    wrapper.find('button').simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});
