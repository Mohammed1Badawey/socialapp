import PostCard from "@/Components/PostCard";
import { Post } from "@/Interfaces/types";
import { getUserPosts } from "@/lib/Redux/Slices/userPostsSlice";
import { store, RootState } from "@/lib/Redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const UserPosts = () => {
  const { userId } = useParams();
  const { userPosts } = useSelector((state: RootState) => state.userPosts);
  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    dispatch(getUserPosts(userId));
    console.log(userPosts);
  }, [dispatch]);
  return (
    <div className="flex flex-col space-y-4 justify-start w-full p-8">
      {userPosts?.map((post: Post) => (
        <PostCard postData={post} key={post._id} />
      ))}
    </div>
  );
};

export default UserPosts;
