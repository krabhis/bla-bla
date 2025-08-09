import React from 'react';
import './Sidebar.css';

const communities = [
  'Health and Fitness',
  'Travel',
  'Food and Cooking',
  'Music',
  'Sports',
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="#">Saved</a></li>
          <li><a href="#">Following</a></li>
        </ul>
      </nav>
      <div className="sidebar-communities">
        <div className="sidebar-communities-header">
          <span>Communities</span>
          <a href="#" className="see-all">See all</a>
        </div>
        <ul>
          {communities.map((community) => (
            <li key={community}>{community}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}