import imgIcon from "@/assets/img-svg.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "@/lib/Redux/Slices/createPostSlice";
import { store } from "@/lib/Redux/store";
import { useRef, useState } from "react";

const CreatePost = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isLoading } = useSelector((state: any) => state.createPost);
  const imageRef = useRef<HTMLInputElement>(null);
  const formData = new FormData();

  const postValidation = Yup.object({
    body: Yup.string().required("Post content is required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "Image size should be less than 10MB",
        (value: any) =>
          !value || (value instanceof File && value.size <= 10 * 1024 * 1024)
      ),
  });

  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: postValidation,
    onSubmit: (values) => {
      formData.append("body", values.body);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      dispatch(createPost(formData)).then(() => {
        handleRemoveImage()
        formik.resetForm()}
      )
    }
  });


const handleFileChange = () => {
    const file = imageRef.current?.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create a Local URL representing ( يمثل ) the selected file and set it as preview
      setPreview(URL.createObjectURL(file));
      console.log(file);
      
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreview(null);
    console.log("Image removed");
    
  };

  return (
    <div className="w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 space-y-4 border border-gray-200 dark:border-gray-700 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Create a Post
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
              Add Image
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

          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
