// src/components/TopBar/TopBar.jsx
import React, { useState } from 'react';
import './TopBar.css';
import { useClerk } from '@clerk/clerk-react';

export default function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { signOut} = useClerk();

  const handleAvatarClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    signOut();
    alert('Logged out!');
    setDropdownOpen(false);
  };

  return (
    <div className="topbar">
      <div className="logo">SocialEcho</div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search for people, posts or communities"
      />
      <div className="avatar-section">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="avatar"
          onClick={handleAvatarClick}
        />
        {dropdownOpen && (
          <div className="dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}