import React from 'react';
import './Header.css';

export function Header({ title, subtitle }) {
  return (
    <header className='header'>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </header>
  );
}
