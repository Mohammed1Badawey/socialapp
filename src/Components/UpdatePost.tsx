import imgIcon from "@/assets/img-svg.svg";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "@/lib/Redux/Slices/updatePostSlice";
import { getSinglePost } from "@/lib/Redux/Slices/singlePostSlice";
import { store } from "@/lib/Redux/store";
import { useRef, useState, useEffect } from "react";
import { postValidation } from "@/Components/Shared/PostJs";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const navigate = useNavigate();
  const { postId: id } = useParams();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isLoading } = useSelector((state: any) => state.updatePost);
  const { post } = useSelector((state: any) => state.singlePost);
  const imageRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  useEffect(() => {
    dispatch(getSinglePost(id));
    console.log(id);
    console.log(post);
  }, [dispatch]);

  useEffect(() => {
    if (post && post.image) {
      setPreview(post.image);
    }
  }, [post]);

  const formik = useFormik({
    initialValues: {
      body: post?.body || "",
    },
    validationSchema: postValidation,
    onSubmit: (values) => {
      formData.append("body", values.body);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      dispatch(
        updatePost({
          postData: formData,
          id,
        })
      ).then(() => {
        handleRemoveImage();
        formik.resetForm();
        navigate(-1);
      });
    },
  });

  const handleFileChange = () => {
    const file = imageRef.current?.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
    formData.delete("image");
  };

  return (
    <div className="w-2xl h-fit mt-6 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 space-y-4 border border-gray-200 dark:border-gray-700 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Update Post
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <textarea
          name="body"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="What's on your mind?"
          className="w-full p-3 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 min-h-[120px]"
        />

        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Post preview"
              className="w-full object-cover rounded-lg max-h-[300px]"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-gray-800/70 text-white rounded-full size-7 hover:bg-gray-900/90"
            >
              X
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <div className="p-1 text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors">
              <img src={imgIcon} alt="" className="size-6" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {preview ? "Change Image" : "Add Image"}
            </span>
            <input
              type="file"
              accept="image/*"
              name="image"
              ref={imageRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="space-x-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
