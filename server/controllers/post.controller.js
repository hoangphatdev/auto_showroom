import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import {v2 as cloudinary} from "cloudinary";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { img } = req.body;
        const userId = req.user.id.toString();

        const user = await User.findById(userId);
        if(!user) return res.status(400).json({ message: "User not found" });

        if(!text && !img){
            return res.status(400).json({ message: "Post must have text or image" });
        }

        if(img) {
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: userId,
            text,
            img
        })

        await newPost.save();
        res.status(201).json(newPost);
    } catch(error) {
        console.log("Error in createPost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const getUserRepostedPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const repostedPosts = await Post.find({ reposts: { $elemMatch: { user: user._id } } })
        .populate({
            path: "user",
            select: "-password",
        })

        res.status(200).json(repostedPosts);
    } catch(error) {
        console.log("Error in getUserRepostedPosts controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const repostPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Retweet post
        const newRepost = {user: userId}
        post.reposts.push(newRepost);
        await post.save();
        const updatedReposts = post.reposts;
        res.status(200).json(updatedReposts);
    } catch(error) {
        console.log("Error in retweetPost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const deleteRepostPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const repostId = req.params.repostId;
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const reposts = post.reposts;

        const ifPostExist = reposts.find((post) => post._id.toString() === repostId.toString());
        if(!ifPostExist) {
            return res.status(404).json({ message: "Tweet not found" });
        }

        const updatedReposts = reposts.filter((post) => post._id.toString() !== repostId.toString());
        post.reposts = updatedReposts;
        await post.save();
        res.status(200).json({message: "Tweet deleted"});
    } catch(error) {
        console.log("Error in deleteTweetedPost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if(post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete this post" });
        }

        if(post.img) {
            const imgId = post.img.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Post deleted" });
    } catch(error) {
        console.log("Error in deletePost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }   
};

export const commentOnPost = async (req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text) {
            return res.status(400).json({ message: "Text field is required" });
        }

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        // get the id of the user who created the post
        const userToModify = await User.findById(post.user);

        const comment = {user: userId, text}

        // 
        const updatedComments = comment;

        post.comments.push(comment);

        await post.save();

        // save notification about comment to the creator of the post
        const newNotification = new Notification({
            type: "comment", 
            from: req.user._id,
            to: userToModify._id,
        });

        await newNotification.save();

        res.status(201).json(updatedComments);

    } catch(error) {
        console.log("Error in commentOnPost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const {postId, commentId} = req.params;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        const comments = post.comments;

        const ifCommentExists = comments.find((comment) => comment._id.toString() === commentId.toString());

        if(!ifCommentExists) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const updatedComments = comments.filter((comment) => comment._id.toString() !== commentId.toString());

        post.comments = updatedComments;

        post.save();

        res.status(200).json({message: "Comment deleted"});

    } catch(error) {
        console.log("Error in deleteComment controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}


export const likeUnlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const userLikedPost = post.likes.includes(userId);
        
        if(userLikedPost){
            // Unlike post
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
            await User.updateOne({_id: userId}, {$pull: {likedPosts: postId}});


            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());

            res.status(200).json(updatedLikes);
        }
        else {
            // Like post
            post.likes.push(userId);
            await User.updateOne({_id: userId}, {$push: {likedPosts: postId}});
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });

            await notification.save();

            const updatedLikes = post.likes;

            res.status(200).json(updatedLikes);
        }

    } catch(error) {
        console.log("Error in likeUnlikePost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const getPost = async (req, res) => {
    try {
        const postid = req.params.id;
        const post = await Post.findById(postid)
        .populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user", 
            select: "-password",
        })
        .populate({
            path: "reposts.user",
            select: "-password",
        });

        res.status(200).json(post);
    } catch(error) {
        console.log("Error in getPost controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user", 
            select: "-password"
        })
        .populate({
            path: "reposts.user",
            select: "-password",
        });

        if(posts.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(posts);
    } catch(error) {
        console.log("Error in getAllPosts controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }

};

export const getNewestPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            img : { $ne: null } // get posts with images only
        })
        .sort({ createdAt: -1 }).limit(3).populate({
            path: "user",
            select: "-password",
        })

        res.status(200).json(posts)
    } catch(error) {
        console.log("Error in getThreeNewestPosts controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export const getLikedPosts = async (req, res) => {
    // const userId = "666d5d96173cae7b3726985f";
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
        .populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password"
        })

        res.status(200).json(likedPosts);
    } catch(error) {
        console.log("Error in getLikedPosts controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};


export const getFollowingPosts = async (req, res) => {
    try {

        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const following = user.following;

        const feedPosts = await Post.find({ user: { $in: following } })
        .sort({ createdAt: -1 })
        .populate({ 
            path: "user",
            select: "-password",
        })
        .populate({
            path: "comments.user",
            select: "-password",
        });

        res.status(200).json(feedPosts);

    } catch(error) {
        console.log("Error in getFollowingPosts controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).populate({
            path: "user",
            select: "-password",
        }).populate({
            path: "comments.user",
            select: "-password",
        })

        res.status(200).json(posts);

    } catch (error) {
        console.log("Error in getUserPosts controller: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const getTests = async (req, res) => {
    res.status(200).json({message: "TEST"})
}