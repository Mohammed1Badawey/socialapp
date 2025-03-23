import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./Slices/User/signUpSlice";
import signInReducer from "./Slices/User/signInSlice";
import userDataReducer from "./Slices/User/userDataSlice";
import postsReducer from "./Slices/Posts/postsSlice";
import singlePostReducer from "./Slices/Posts/singlePostSlice";
import userPostsReducer from "./Slices/Posts/userPostsSlice";
import createPostReducer from "./Slices/Posts/createPostSlice";
import updatePostReducer from "./Slices/Posts/updatePostSlice";
import deletePostReducer from "./Slices/Posts/deletePostSlice";
import createCommentReducer from "./Slices/Comments/createCommentSlice";
import postCommentsReducer from "./Slices/Comments/getPostCommentsSlice";
import updateCommentReducer from "./Slices/Comments/updateCommentSlice";
import deleteCommentReducer from "./Slices/Comments/deleteCommentSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
    userData: userDataReducer,
    posts: postsReducer,
    singlePost: singlePostReducer,
    userPosts: userPostsReducer,
    createPost: createPostReducer,
    updatePost: updatePostReducer,
    deletePost: deletePostReducer,
    createComment: createCommentReducer,
    postComments: postCommentsReducer,
    updateComment: updateCommentReducer,
    deleteComment: deleteCommentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
