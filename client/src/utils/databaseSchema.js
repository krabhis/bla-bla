// Database Schema for MongoDB Integration
// This file shows the structure of data that will be saved to MongoDB

export const userProfileSchema = {
  // Basic user information
  userId: String,           // Unique user identifier (e.g., @johndoe)
  email: String,            // User's email address
  name: String,             // Full name
  bio: String,              // User bio/description
  profilePicture: String,   // URL to profile picture
  
  // Social stats
  followers: Number,        // Number of followers
  following: Number,        // Number of people following
  posts: Number,            // Number of posts
  
  // Timestamps
  createdAt: Date,          // When profile was created
  updatedAt: Date,          // When profile was last updated
  
  // Additional fields for future expansion
  location: String,         // User's location
  website: String,          // Personal website
  isPrivate: Boolean,       // Private profile flag
  verified: Boolean         // Verified account status
};

export const postSchema = {
  // Post information
  postId: String,           // Unique post identifier
  userId: String,           // User who created the post
  imageUrl: String,         // URL to post image
  caption: String,          // Post caption/text
  
  // Engagement metrics
  likes: Number,            // Number of likes
  comments: Number,         // Number of comments
  shares: Number,           // Number of shares
  
  // Timestamps
  createdAt: Date,          // When post was created
  updatedAt: Date,          // When post was last updated
  
  // Additional fields
  tags: [String],           // Hashtags
  location: String,         // Location tag
  isPrivate: Boolean        // Private post flag
};

// Example API endpoints that will be implemented:
/*
POST /api/profile/update - Update user profile
GET /api/profile/:userId - Get user profile
POST /api/posts/create - Create new post
GET /api/posts/user/:userId - Get user's posts
PUT /api/posts/:postId/like - Like/unlike post
POST /api/posts/:postId/comment - Add comment to post
*/
