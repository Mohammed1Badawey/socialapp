import { Post } from "@/Interfaces/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import staticImg from "../assets/user-icon.webp";
import { Link } from "react-router-dom";
import { store } from "@/lib/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "@/lib/Redux/Slices/deletePostSlice";
import { getUserPosts } from "@/lib/Redux/Slices/userPostsSlice";

const PostCard = ({ postData }: { postData: Post }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPostDetails, setShowPostDetails] = useState(false);
  const dispatch = useDispatch<typeof store.dispatch>();
  const {id:userId} = useSelector((state: any) => state.deletePost);

  function handelUserPage(id: string) {
    navigate(`/user/${id}`);
  }

  function handelDeletePost(id: string) {
    dispatch(deletePost(id)).then(() => {
      dispatch(getUserPosts(userId))});
  }

  function handelCommentImg(imgSrc: string) {
    const allSrc = imgSrc.split("/");
    const lastKey = allSrc[allSrc.length - 1];
    if (lastKey === "undefined") {
      return staticImg;
    } else {
      return imgSrc;
    }
  }

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;
    // TODO: Implement comment submission logic here
    setComment("");
  };

  const sortedComments = [...postData.comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [numCommentsToShow, setNumCommentsToShow] = useState(5);

  const displayedComments = sortedComments.slice(0, numCommentsToShow);
  return (
    <div className="w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 space-y-4 border border-gray-200 dark:border-gray-700">
      
      <div className="flex items-center space-x-3 justify-between">
        <div className="flex items-center space-x-3">
        <img
          src={postData.user.photo}
          alt={postData.user.name}
          className="size-12 rounded-full border dark:border-gray-600 cursor-pointer"
          onClick={() => handelUserPage(postData.user._id)}
        />
        <div>
          <p
            className="text-lg font-semibold dark:text-white cursor-pointer"
            onClick={() => handelUserPage(postData.user._id)}
          >
            {postData.user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(postData.createdAt).toUTCString()}
          </p>
        </div>
        </div>
        <div className="relative">
          <button className="text-2xl font-bold p-2 cursor-pointer"
          onClick={() => setShowPostDetails(!showPostDetails)}
          >
            ...
          </button>
          <div className="">
            {showPostDetails && (
              <div className="absolute -translate-x-1/2 -left-1 flex flex-col justify-center items-center text-center bg-gray-50 min-w-[100px] dark:bg-gray-800 outline border-gray-800 rounded shadow-xl p-2">
                <Link to={`/post/${postData._id}`} className="border-b border-gray-300/90  w-full">
                Details
                </Link>
                <Link to={`/edit-post/${postData._id}`} className="border-b border-gray-300/90  w-full"
                >
                Edit
                </Link>
                <span  className="border-b border-gray-300/90 cursor-pointer w-full"
                onClick={() => handelDeletePost(postData._id)}
                >
                Delete
                </span>
          </div>
            )}
          </div>
        </div>
      </div>



      <p className="text-gray-800 dark:text-gray-200">{postData.body}</p>
      {postData.image && (
        <img
          src={postData.image}
          alt="Post"
          className="w-full object-cover rounded-lg cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      )}
      
      <div className="border-t dark:border-gray-700 py-2">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 p-2 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors"
          >
            Post
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold py-3">
          Comments:
        </p>
        <div className="space-y-3">
          {displayedComments.map((comment) => (
            <div key={comment._id} className="flex items-start space-x-2">
              <img
                src={handelCommentImg(comment.commentCreator.photo)}
                alt={comment.commentCreator.name}
                className="size-8 object-cover rounded-full border dark:border-gray-600"
              />
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg w-full">
                <p className="text-sm font-semibold dark:text-white">
                  {comment.commentCreator.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {comment.content}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(comment.createdAt).toUTCString()}
                </p>
              </div>
            </div>
          ))}
          {sortedComments.length > numCommentsToShow && (
            <button
              onClick={() => setNumCommentsToShow((prev) => prev + 5)}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              Show{" "}
              {sortedComments.length - numCommentsToShow > 5
                ? "More Comments"
                : ` Latest ${
                    sortedComments.length - numCommentsToShow
                  } Comments`}
            </button>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showModal && postData.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="max-w-4xl max-h-[90vh] p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={postData.image}
              alt="Enlarged post"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 size-8 right-4 text-white bg-gray-500 bg-opacity-50 hover:bg-opacity-75 rounded-full p-1"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
