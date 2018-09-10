import React from 'react';
import PropTypes from 'prop-types';

export class UserForm extends React.Component {
  state = {
    userImg: '',
    userNick: '',
  };

  handleTextInput = (e) => {
    if (e.target.name === 'userNick') {
      this.setState({ userNick: e.target.value });
    }
    if (e.target.name === 'userImg') {
      this.setState({ userImg: e.target.value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [this.state.userNick, this.state.userImg];
    this.setState({ userNick: '', userImg: '' });
    this.props.onChangeProfile(formData);
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="userNick">
            <span>UserNick</span>
              <input
                id="userNick"
                name="userNick"
                value={this.state.userNick}
                onChange={this.handleTextInput}
                type="text"
              />
          </label>
            <label htmlFor="userImg">
              <span>Cover image</span>
                <input
                  id="userImg"
                  name="userImg"
                  value={this.state.userImg}
                  onChange={this.handleTextInput}
                  type="text"
                />
            </label>
              <button disabled={!this.state.userNick}>Change</button>
        </form>
      </div>
    );
  }
}

UserForm.propTypes = {
  onChangeProfile: PropTypes.func.isRequired,
};
