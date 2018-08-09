import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link href="/" to="/">Home</Link></li>
        <li><Link href="/login" to="/login">Login</Link></li>
      </ul>
    </nav>
  </header>
);
