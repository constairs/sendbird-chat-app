import React from 'react';
import { Navigation } from '../../navigation';
import { Header } from '../Header';

export class AppBody extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation onLogin={this.handleLogin} />
      </div>
    );
  }
}
