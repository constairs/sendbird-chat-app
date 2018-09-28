import React from 'react';
import { shallow } from 'enzyme';

import { Head, HeaderUserProfile } from '../../src/containers/Header';

describe('<Header /> ', () => {
  it('should show channels link', () => {
    const header = shallow(<Head logged />);
    expect(header.find('Link[href="/channels"]')).toExist();
  });
  it('should show prolife', () => {
    const header = shallow(<Head logged />);
    expect(header.find(HeaderUserProfile)).toExist();
  });
});
