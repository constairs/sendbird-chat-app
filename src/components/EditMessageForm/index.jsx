import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = styled.form`
  display: flex;
  box-shadow: none;
  padding: 0;
  input {
    font-size: 14px;
    height: 30px;
    border-radius: 3px; 
    border: 1px solid ${props => props.theme.colors.main};
  }
  button {
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
      <Form onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.handleTextInput} value={this.state.messageInput} />
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </Form>
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
