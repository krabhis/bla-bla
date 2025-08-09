import React, { useState } from 'react';
import './ProfileHeader.css';

export default function ProfileHeader({ userProfile, onProfileUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    userId: userProfile.userId,
    email: userProfile.email,
    bio: userProfile.bio,
    profilePicture: userProfile.profilePicture
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onProfileUpdate({
      ...userProfile,
      ...editForm
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: userProfile.name,
      userId: userProfile.userId,
      email: userProfile.email,
      bio: userProfile.bio,
      profilePicture: userProfile.profilePicture
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-header">
      <div className="profile-info">
        <div className="profile-picture-section">
          {isEditing ? (
            <div className="profile-picture-edit">
              <img src={editForm.profilePicture} alt="Profile" />
              <input
                type="text"
                name="profilePicture"
                value={editForm.profilePicture}
                onChange={handleInputChange}
                placeholder="Profile picture URL"
                className="picture-url-input"
              />
            </div>
          ) : (
            <img 
              src={userProfile.profilePicture} 
              alt="Profile" 
              className="profile-picture"
            />
          )}
        </div>
        
        <div className="profile-details">
          <div className="profile-name-section">
            {isEditing ? (
              <div className="edit-name-section">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="name-input"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="userId"
                  value={editForm.userId}
                  onChange={handleInputChange}
                  className="userid-input"
                  placeholder="@username"
                />
              </div>
            ) : (
              <>
                <h1 className="profile-name">{userProfile.name}</h1>
                <p className="profile-userid">{userProfile.userId}</p>
              </>
            )}
          </div>

          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{userProfile.posts}</span>
              <span className="stat-label">posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userProfile.followers}</span>
              <span className="stat-label">followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userProfile.following}</span>
              <span className="stat-label">following</span>
            </div>
          </div>

          <div className="profile-bio-section">
            {isEditing ? (
              <div className="edit-bio-section">
                <input
                  type="text"
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  className="bio-input"
                  placeholder="Write a bio..."
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="email-input"
                  placeholder="Email address"
                />
              </div>
            ) : (
              <>
                <p className="profile-bio">{userProfile.bio}</p>
                <p className="profile-email">{userProfile.email}</p>
              </>
            )}
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="edit-profile-btn" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
