import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form } from '../UI/Form';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

const EditForm = styled(Form)`
  display: flex;
  box-shadow: none;
  padding: 0;
  input {
    font-size: 14px;
    height: 30px;
    border-radius: 3px; 
    border: 1px solid ${props => props.theme.colors.main};
  }
  ${Button} {
    font-size: 12px;
    height: 30px;
    width: 30px;
    padding: 0;
  }
`;

export class EditMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: props.text,
    };
  }

  handleTextInput = (e) => {
    this.setState({ messageInput: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onEditMessage(
      this.state.messageInput
    );
  };

  render() {
    return (
      <EditForm onSubmit={this.handleSubmit}>
        <Input type="text" onChange={this.handleTextInput} value={this.state.messageInput} />
        <Button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </EditForm>
    );
  }
}

EditMessageForm.defaultProps = {
  text: ''
};

EditMessageForm.propTypes = {
  onEditMessage: PropTypes.func.isRequired,
  text: PropTypes.string,
};
