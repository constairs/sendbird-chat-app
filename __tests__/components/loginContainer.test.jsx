import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router';

import { Login } from '../../src/containers/LoginContainer';
import { LoginForm } from '../../src/components/LoginForm';
import { Preloader } from '../../src/components/UI/Preloader';

let user = {
  logged: false,
  userFetching: true,
  error: 'error message'
};

describe('<Login />', () => {
  it('should render preloader', () => {
    const login = shallow(<Login user={user} userActions={{ fn: jest.fn() }} />);
    expect(login.find(Preloader)).toExist();
  });
  it('should render loginForm', () => {
    let login = shallow(<Login user={user} userActions={{ fn: jest.fn() }} />);
    expect(login.find(LoginForm)).toExist();
    user = { ...user, logged: true };
    login = shallow(<Login user={user} userActions={{ fn: jest.fn() }} />);
    expect(login.find(Redirect)).toExist();
  });
});

