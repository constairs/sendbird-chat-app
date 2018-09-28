import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UsersToInvite } from '../UI/UsersToInvite';

export const Form = styled.form`
  background-color: #d6d4d4;
  min-width: auto;
  padding: 15px;
`;

export class InviteForm extends React.Component {
  state = {
    usersIdsInput: '',
    usersToInvite: [],
  };

  handleInput = (e) => {
    this.setState({ usersIdsInput: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onInviteUsers();
    this.setState({ usersIdsInput: '', usersToInvite: [] });
  };

  handleAddUser = () => {
    this.setState({
      usersToInvite: [...this.state.usersToInvite, this.state.usersIdsInput],
      usersIdsInput: '',
    });
  };

  handleDelUser = (e) => {
    this.setState({
      usersToInvite: this.state.usersToInvite.filter(userId => userId !== e.target.id),
    });
  };

  render() {
    const { usersIdsInput, usersToInvite } = this.state;
    return (
      <Form onSubmit={this.handleFormSubmit}>
        <label htmlFor="userId" className="groupUsers">
          <span>user ids</span>
          <input id="userId" value={usersIdsInput} onChange={this.handleInput} type="text" />
          <button className="invite-button" onClick={this.handleAddUser} type="button">
          ок
          </button>
          {usersToInvite.length !== 0 ? (
            <UsersToInvite>
              {usersToInvite.map(item => (
                <li key={item}>
                  {item}{' '}
                  <button id={item} onClick={this.handleDelUser} type="button">
              x
                  </button>
                </li>
        ))}
            </UsersToInvite>
    ) : null}
        </label>
        <button type="submit">Пригласить</button>
      </Form>
    );
  }
}

InviteForm.propTypes = {
  onInviteUsers: PropTypes.func.isRequired,
};
