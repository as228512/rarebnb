import React from 'react';
import { Link } from 'react-router-dom';



const Greeting = ({ currentUser, logout, openModal }) => {

  const sessionLinks = () => (
    <nav className="login-signup">
      <a onClick={() => openModal('login')}>Log in</a>
      <a onClick={() => openModal('signup')}>Sign up</a>
    </nav>
  );

  const personalGreeting = () => (
    <hgroup className="header-group">
      <h2 className="header-name">Hi, {currentUser.fname}!</h2>
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  );

  return currentUser ? personalGreeting(currentUser, logout) : sessionLinks();
};


export default Greeting;
