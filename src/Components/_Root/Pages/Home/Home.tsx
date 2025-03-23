import PostCard from "@/Components/PostCard";
import CreatePost from "@/Components/CreatePost";
import { Post } from "@/Interfaces/types";
import { getAllPosts } from "@/lib/Redux/Slices/Posts/postsSlice";
import { store, RootState } from "@/lib/Redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { allPosts } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    dispatch(getAllPosts());
    console.log(allPosts);
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-4 justify-start w-full p-8">
      <CreatePost />
      {allPosts?.map((post: Post) => (
        <PostCard postData={post} key={post._id} />
      ))}
    </div>
  );
};

export default Home;
