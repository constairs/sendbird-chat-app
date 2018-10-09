import React from 'react';
import { shallow } from 'enzyme';

import { FileUploadForm } from '../../src/components/FileUploadForm';
import { FileItem } from '../../src/components/UI/FileItem';
import { FilePreview } from '../../src/components/UI/FilePreview';

const fileToUpload = {
  name: 'ddd',
  size: 111,
  preview: 'blob:http://0.0.0.0:3003/bc15c8f6-0252-47a0-b179-2e4bf52bf164',
  type: 'image/jpeg'
};

const mock = jest.fn();

describe('<FileUploadForm />', () => {
  it('should render file for uploading', () => {
    const wrapper = shallow(
      <FileUploadForm onFileSend={mock} />
    );
    expect(wrapper.state('fileToUpload')).toBe('');
    wrapper.setState({ fileToUpload });
    expect(wrapper.find(FileItem)).toExist();
    expect(wrapper.find(FilePreview).children()).toExist();
    wrapper.setState({ customMessageType: 'IMAGE' });
    expect(wrapper.find(FilePreview).find('img').prop('src')).toBe(fileToUpload.preview);
    expect(wrapper.find(FileItem).find('p').text()).toBe(`${fileToUpload.size} кб`);
  });
  it('should clear file for uploading', () => {
    const wrapper = shallow(
      <FileUploadForm onFileSend={mock} />
    );
    wrapper.setState({ fileToUpload });
    wrapper.find('.clear-file-upload').simulate('click');
  });
});
