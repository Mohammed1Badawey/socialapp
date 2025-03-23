import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./Slices/signUpSlice";
import signInReducer from "./Slices/signInSlice";
import userDataReducer from "./Slices/userDataSlice";
import postsReducer from "./Slices/postsSlice";
import singlePostReducer from "./Slices/singlePostSlice";
import userPostsReducer from "./Slices/userPostsSlice";
import createPostReducer from "./Slices/createPostSlice";
import updatePostReducer from "./Slices/updatePostSlice";
import deletePostReducer from "./Slices/deletePostSlice";

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
  },
});

export type RootState = ReturnType<typeof store.getState>;