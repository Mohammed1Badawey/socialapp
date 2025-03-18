import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";
import signInReducer from "./signInSlice";
import userDataReducer from "./userDataSlice";
import postsReducer from "./postsSlice";
import singlePostReducer from "./singlePostSlice";
import userPostsReducer from "./userPostsSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    signIn: signInReducer,
    userData: userDataReducer,
    posts: postsReducer,
    singlePost: singlePostReducer,
    userPosts: userPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
