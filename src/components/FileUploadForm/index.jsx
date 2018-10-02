import React from 'react';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTimes, faFileAudio, faFileVideo } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { FileUpload } from './index.styles';
import { FilePreview } from '../UI/FilePreview';
import { FileItem } from '../UI/FileItem';
import { Button } from '../UI/Button';
import { Input } from '../../components/UI/Input';

export class FileUploadForm extends React.Component {
  state = {
    fileMessageText: '',
    uploadedFile: [],
    fileToUpload: '',
    customMessageType: '',
    errorUpload: ''
  };

  handleTextInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFileForm = (e) => {
    e.preventDefault();
    const fileData = [
      ...this.state.uploadedFile,
      this.state.fileMessageText,
      this.state.customMessageType
    ];
    this.props.onFileSend(fileData);
    this.setState({
      uploadedFile: [],
      fileUploadModal: false,
      fileToUpload: '',
      fileMessageText: '',
    });
  };

  fileUploadModal = () => {
    this.setState({ fileUploadModal: !this.state.fileUploadModal });
  };

  handleDropFile = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({
          fileToUpload: file,
        });
        this.setState({
          uploadedFile: [file, file.name, file.type, file.size],
        });
        if (new RegExp('^image?', 'i').test(file.type)) {
          this.setState({
            customMessageType: 'IMAGE'
          });
        } else if (new RegExp('^audio?', 'i').test(file.type)) {
          this.setState({
            customMessageType: 'AUDIO'
          });
        } else if (new RegExp('^video?', 'i').test(file.type)) {
          this.setState({
            customMessageType: 'VIDEO'
          });
        } else {
          this.setState({
            customMessageType: ''
          });
        }
      };
      reader.onerror = () => {
        this.setState({
          errorUpload: 'Ошибка загрузки файла'
        });
      };
      reader.readAsBinaryString(file);
    });
  };

  handleClearFile = () => {
    this.setState({
      customMessageType: '',
      uploadedFile: [],
      fileToUpload: '',
      fileMessageText: '',
    });
  }

  render() {
    const {
      fileToUpload,
      fileMessageText,
      customMessageType,
      errorUpload
    } = this.state;
    return (
      <FileUpload onSubmit={this.handleFileForm}>
        <Dropzone className="dropzone" onDrop={this.handleDropFile} />
        {fileToUpload ? (
          <div>
            <p>Файл для отправки</p>
            <FileItem>
              <Button className="clear-file-upload" onClick={this.handleClearFile}>
                <FontAwesomeIcon icon={faTimes} />
              </Button>
              <FilePreview>
                {customMessageType === '' ? (
                  <FontAwesomeIcon icon={faFile} />
                ) : (
                  <div>
                    {
                      customMessageType === 'IMAGE' ?
                        <img src={fileToUpload.preview} alt="preview" />
                      :
                        (
                          <div>
                            {
                              customMessageType === 'AUDIO' ?
                                <FontAwesomeIcon icon={faFileAudio} />
                              :
                                <FontAwesomeIcon icon={faFileVideo} />
                            }
                          </div>
                        )
                    }
                  </div>
                )}
              </FilePreview>
              <p>{fileToUpload.size} кб</p>
            </FileItem>
          </div>
      ) : null}
        {errorUpload || null}
        <Input
          type="text"
          placeholder="Сообщение"
          name="fileMessageText"
          value={fileMessageText}
          onChange={this.handleTextInput}
          disabled={!fileToUpload}
        />
        <Button type="submit">Отправить</Button>
      </FileUpload>
    );
  }
}

FileUploadForm.propTypes = {
  onFileSend: PropTypes.func.isRequired,
};
