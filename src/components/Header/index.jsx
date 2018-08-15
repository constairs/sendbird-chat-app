import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link href="/" to="/">Home</Link></li>
        <li><Link href="/login" to="/login">Login</Link></li>
        <li><Link href="/channels" to="/channels">Channels</Link></li>
      </ul>
    </nav>
  </header>
);
