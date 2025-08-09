import React, { useState } from 'react';
import TopBar from '../components/TopBar/TopBar';
import SideBar from '../components/Sidebar/Sidebar';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import ProfilePosts from '../components/ProfilePosts/ProfilePosts';
import './Profile.css';

function Profile() {
  const [activeTab, setActiveTab] = useState('posts');
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    userId: '@johndoe',
    email: 'john@example.com',
    bio: 'Living life one day at a time ✨',
    profilePicture: 'https://i.pravatar.cc/150',
    followers: 1234,
    following: 567,
    posts: 89
  });

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
    // TODO: Save to MongoDB database
    console.log('Profile updated:', updatedProfile);
  };

  return (
    <>
      <TopBar />
      <div className="profile-container">
        <SideBar />
        <div className="profile-main">
          <ProfileHeader 
            userProfile={userProfile} 
            onProfileUpdate={handleProfileUpdate}
          />
          <div className="profile-tabs">
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                Posts
              </button>
              <button 
                className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                Saved
              </button>
              <button 
                className={`tab-btn ${activeTab === 'liked' ? 'active' : ''}`}
                onClick={() => setActiveTab('liked')}
              >
                Liked
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'posts' && <ProfilePosts type="posts" />}
              {activeTab === 'saved' && <ProfilePosts type="saved" />}
              {activeTab === 'liked' && <ProfilePosts type="liked" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
