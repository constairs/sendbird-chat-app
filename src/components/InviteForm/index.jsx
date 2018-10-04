import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { UsersToInvite } from '../UI/UsersToInvite';
import { Button } from '../UI/Button';
import { Form } from '../../components/UI/Form';
import { Input } from '../../components/UI/Input';

export const StyledForm = styled(Form)`
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
    this.props.onInviteUsers(this.state.usersToInvite);
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
      <StyledForm onSubmit={this.handleFormSubmit}>
        <label htmlFor="userId" className="groupUsers">
          <span>user ids</span>
          <Input id="userId" value={usersIdsInput} onChange={this.handleInput} type="text" />
          <Button className="invite-button" onClick={this.handleAddUser} type="button">
          ок
          </Button>
          {usersToInvite.length !== 0 ? (
            <UsersToInvite>
              {usersToInvite.map(item => (
                <li key={item}>
                  {item}{' '}
                  <Button id={item} onClick={this.handleDelUser} type="button">
              x
                  </Button>
                </li>
        ))}
            </UsersToInvite>
    ) : null}
        </label>
        <Button type="submit">Пригласить</Button>
      </StyledForm>
    );
  }
}

InviteForm.propTypes = {
  onInviteUsers: PropTypes.func.isRequired,
};
