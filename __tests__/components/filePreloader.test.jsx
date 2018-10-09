import React from 'react';
import { shallow } from 'enzyme';

import { FilePreloader } from '../../src/components/FilePreloader';
import { Button } from '../../src/components/UI/Button';

const uploadProgress = {
  progress: 100
};

const mock = jest.fn();

describe('<FilePreloader />', () => {
  it('should render loading progress', () => {
    const preloader = shallow(
      <FilePreloader
        progress={uploadProgress.progress}
        onCancelUploading={mock}
      />
    );
    expect(preloader.find('.loading-progress').text()).toBe(`${uploadProgress.progress} %`);
  });
  it('should render upload cancel upload button', () => {
    const newProgress = {
      progress: 66
    };
    const preloader = shallow(
      <FilePreloader
        progress={newProgress.progress}
        onCancelUploading={mock}
      />
    );
    expect(preloader.find(Button)).toExist();
  });
});
