import React from 'react';
import './ProfilePosts.css';

export default function ProfilePosts({ type }) {
  // Mock data - will be replaced with MongoDB data later
  const mockPosts = [
    {
      id: 1,
      image: 'https://picsum.photos/300/300?random=1',
      likes: 123,
      comments: 45
    },
    {
      id: 2,
      image: 'https://picsum.photos/300/300?random=2',
      likes: 89,
      comments: 23
    },
    {
      id: 3,
      image: 'https://picsum.photos/300/300?random=3',
      likes: 234,
      comments: 67
    },
    {
      id: 4,
      image: 'https://picsum.photos/300/300?random=4',
      likes: 156,
      comments: 34
    },
    {
      id: 5,
      image: 'https://picsum.photos/300/300?random=5',
      likes: 78,
      comments: 12
    },
    {
      id: 6,
      image: 'https://picsum.photos/300/300?random=6',
      likes: 345,
      comments: 89
    }
  ];

  const getTabTitle = () => {
    switch(type) {
      case 'posts': return 'Posts';
      case 'saved': return 'Saved Posts';
      case 'liked': return 'Liked Posts';
      default: return 'Posts';
    }
  };

  return (
    <div className="profile-posts">
      <h3 className="posts-title">{getTabTitle()}</h3>
      <div className="posts-grid">
        {mockPosts.map((post) => (
          <div key={post.id} className="post-item">
            <img src={post.image} alt={`Post ${post.id}`} />
            <div className="post-overlay">
              <div className="post-stats">
                <span className="post-likes">❤️ {post.likes}</span>
                <span className="post-comments">💬 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
