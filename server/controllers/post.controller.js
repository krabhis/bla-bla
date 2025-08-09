import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js"; 
dayjs.extend(relativeTime);

import Post from "../models/post.model"

const createPost = async (req, res) => {
  try {
    const { communityId, content } = req.body;
    const { userId, file, fileUrl, fileType } = req;
 
    const community = await Community.findOne({
      _id: { $eq: communityId },
      members: { $eq: userId },
    });

    if (!community) {
      if (file) {
        const filePath = `./assets/userFiles/${file.filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      return res.status(401).json({
        message: "Unauthorized to post in this community",
      });
    }

    const newPost = new Post({
      user: userId,
      community: communityId,
      content,
      fileUrl: fileUrl ? fileUrl : null,
      fileType: fileType ? fileType : null,
    });

    const savedPost = await newPost.save();
    const postId = savedPost._id;

    const post = await Post.findById(postId)
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    post.createdAt = dayjs(post.createdAt).fromNow();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
    });
  }
};



const confirmPost = async (req, res) => {
  try {
    const { confirmationToken } = req.params;
    const userId = req.userId;
    const pendingPost = await PendingPost.findOne({
      confirmationToken: { $eq: confirmationToken },
      status: "pending",
      user: userId,
    });

    if (!pendingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { user, community, content, fileUrl, fileType } = pendingPost;
    const newPost = new Post({
      user,
      community,
      content,
      fileUrl,
      fileType,
    });

    await PendingPost.findOneAndDelete({
      confirmationToken: { $eq: confirmationToken },
    });
    const savedPost = await newPost.save();
    const postId = savedPost._id;

    const post = await Post.findById(postId)
      .populate("user", "name avatar")
      .populate("community", "name")
      .lean();

    post.createdAt = dayjs(post.createdAt).fromNow();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error publishing post",
    });
  }
};