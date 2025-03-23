import PostCard from "@/Components/PostCard";
// import { Post } from "@/Interfaces/types";
import { getSinglePost } from "@/lib/Redux/Slices/Posts/singlePostSlice";
import { store, RootState } from "@/lib/Redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const SinglePost = () => {
  const { postId } = useParams();
  const { post } = useSelector((state: RootState) => state.singlePost);
  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    dispatch(getSinglePost(postId));
    console.log(post);
  }, [dispatch]);
  return (
    <div className="flex flex-col space-y-4 justify-center w-full p-8">
      {post ? <PostCard postData={post} /> : <p>Loading...</p>}
    </div>
  );
};

export default SinglePost;
