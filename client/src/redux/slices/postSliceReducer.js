import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getErrorMessage = (err) => {
  if (!err) return 'Unknown error';
  if (err.response && err.response.data && err.response.data.message) return err.response.data.message;
  if (err.message) return err.message;
  return String(err);
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ limit = 10, skip = 0 } = {}, thunkAPI) => {
    try {
      const res = await axios.get(`/posts?limit=${limit}&skip=${skip}`);
      // backend returns { formattedPosts, totalPosts }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Fetch single post by id
export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Create post: accepts FormData (for file upload) or plain object
export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ communityId, content, file }, thunkAPI) => {
    try {
      // If file exists, use multipart/form-data
      let config = {};
      let body = { communityId, content };

      if (file) {
        const fd = new FormData();
        fd.append('communityId', communityId);
        fd.append('content', content ?? '');
        fd.append('file', file);
        body = fd;
        config.headers = { 'Content-Type': 'multipart/form-data' };
      }

      const res = await axios.post('/posts', body, config);
      // backend returns created post
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Like a post
export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, thunkAPI) => {
    try {
      const res = await axios.post(`/posts/${postId}/like`);
      return res.data; // expects formatted post object
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Unlike a post
export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId, thunkAPI) => {
    try {
      const res = await axios.post(`/posts/${postId}/unlike`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Add comment to post
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, content }, thunkAPI) => {
    try {
      // controller expects { content, postId } body
      const res = await axios.post(`/posts/${postId}/comment`, { content, postId });
      return { postId, result: res.data };
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Save or unsave
export const savePost = createAsyncThunk(
  'posts/savePost',
  async (postId, thunkAPI) => {
    try {
      const res = await axios.post(`/posts/${postId}/save`);
      return res.data; // expects array of saved posts
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

export const unsavePost = createAsyncThunk(
  'posts/unsavePost',
  async (postId, thunkAPI) => {
    try {
      const res = await axios.post(`/posts/${postId}/unsave`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get saved posts
export const fetchSavedPosts = createAsyncThunk(
  'posts/fetchSavedPosts',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/posts/saved');
      return res.data; // expects array of posts
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get community posts
export const fetchCommunityPosts = createAsyncThunk(
  'posts/fetchCommunityPosts',
  async ({ communityId, limit = 10, skip = 0 }, thunkAPI) => {
    try {
      const res = await axios.get(`/posts/community/${communityId}?limit=${limit}&skip=${skip}`);
      return res.data; // { formattedPosts, totalCommunityPosts }
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get following users' posts in a community
export const fetchFollowingUsersPosts = createAsyncThunk(
  'posts/fetchFollowingUsersPosts',
  async ({ communityId }, thunkAPI) => {
    try {
      const res = await axios.get(`/posts/${communityId}/following`);
      return res.data; // expects array of posts
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Get public user posts
export const fetchPublicPosts = createAsyncThunk(
  'posts/fetchPublicPosts',
  async ({ publicUserId }, thunkAPI) => {
    try {
      const res = await axios.get(`/posts/${publicUserId}/userPosts`);
      return res.data; // array of posts
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, thunkAPI) => {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      return { postId, message: res.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(getErrorMessage(err));
    }
  }
);

const initialState = {
  posts: [],
  totalPosts: 0,
  currentPost: null,
  savedPosts: [],
  communityPosts: [],
  communityTotal: 0,
  followingPosts: [],
  publicPosts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPostsState(state) {
      state.posts = [];
      state.totalPosts = 0;
      state.currentPost = null;
      state.savedPosts = [];
      state.communityPosts = [];
      state.communityTotal = 0;
      state.followingPosts = [];
      state.publicPosts = [];
      state.loading = false;
      state.error = null;
    },


    optimisticToggleLike(state, action) {
      const { postId, userId } = action.payload;
      const idx = state.posts.findIndex((p) => p._id === postId || p.id === postId);
      const toggleIn = (post) => {
        if (!post) return;
        // ensure likes array exists
        post.likes = post.likes || [];
        const has = post.likes.some((u) => (u._id ? u._id === userId : u === userId));
        if (has) {
          post.likes = post.likes.filter((u) => (u._id ? u._id !== userId : u !== userId));
        } else {
          post.likes.push({ _id: userId });
        }
      };
      if (idx >= 0) toggleIn(state.posts[idx]);
      if (state.currentPost && (state.currentPost._id === postId || state.currentPost.id === postId)) {
        toggleIn(state.currentPost);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.formattedPosts || action.payload.posts || [];
        state.totalPosts = (action.payload.totalPosts ?? action.payload.total) || 0;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // fetchPost
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        // prepend new created post to posts list
        state.posts = [action.payload, ...(state.posts || [])];
        state.totalPosts = (state.totalPosts || 0) + 1;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // likePost
      .addCase(likePost.pending, (state) => {
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // backend returns formattedPost object
        const updated = action.payload;
        // update in posts array
        const idx = state.posts.findIndex((p) => (p._id === updated._id || p.id === updated.id));
        if (idx >= 0) state.posts[idx] = updated;
        if (state.currentPost && (state.currentPost._id === updated._id || state.currentPost.id === updated.id)) {
          state.currentPost = updated;
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // unlikePost
      .addCase(unlikePost.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.posts.findIndex((p) => (p._id === updated._id || p.id === updated.id));
        if (idx >= 0) state.posts[idx] = updated;
        if (state.currentPost && (state.currentPost._id === updated._id || state.currentPost.id === updated.id)) {
          state.currentPost = updated;
        }
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // addComment
      .addCase(addComment.pending, (state) => {
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // backend simply returns message; we keep UI simple by refetching post in component
      })
      .addCase(addComment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // save/unsave
      .addCase(savePost.fulfilled, (state, action) => {
        // backend returns updated saved posts array (formatted)
        state.savedPosts = action.payload;
      })
      .addCase(unsavePost.fulfilled, (state, action) => {
        state.savedPosts = action.payload;
      })
      .addCase(savePost.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // fetchSavedPosts
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.savedPosts = action.payload;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // community posts
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.communityPosts = action.payload.formattedPosts || [];
        state.communityTotal = action.payload.totalCommunityPosts ?? 0;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // following posts
      .addCase(fetchFollowingUsersPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFollowingUsersPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.followingPosts = action.payload;
      })
      .addCase(fetchFollowingUsersPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // public posts
      .addCase(fetchPublicPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.publicPosts = action.payload;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // delete
      .addCase(deletePost.fulfilled, (state, action) => {
        const { postId } = action.payload;
        state.posts = state.posts.filter((p) => !(p._id === postId || p.id === postId));
        if (state.currentPost && (state.currentPost._id === postId || state.currentPost.id === postId)) {
          state.currentPost = null;
        }
        state.totalPosts = Math.max(0, (state.totalPosts || 1) - 1);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearPostsState, optimisticToggleLike } = postsSlice.actions;

export default postsSlice.reducer;

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectTotalPosts = (state) => state.posts.totalPosts;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectSavedPosts = (state) => state.posts.savedPosts;
export const selectCommunityPosts = (state) => state.posts.communityPosts;
export const selectFollowingPosts = (state) => state.posts.followingPosts;
export const selectPublicPosts = (state) => state.posts.publicPosts;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsError = (state) => state.posts.error;

