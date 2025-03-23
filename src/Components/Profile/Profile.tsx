import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { loggedUser } from "@/lib/Redux/Slices/User/userDataSlice";
import { store } from "@/lib/Redux/store";
import staticImg from "../../assets/user-icon.webp";

const Profile = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    dispatch(loggedUser());
  }, [dispatch]);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle profile image
  const profileImage = userData.photo ? userData.photo : staticImg;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {/* Profile Header with Background */}
        <div className="bg-blue-600 dark:bg-gray-700 h-32 relative">
          {/* Profile Image */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <img
              src={profileImage}
              alt={userData.name}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-8 px-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {userData.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
            {userData.email}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Gender:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {userData.gender}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Date of Birth:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {formatDate(userData.dateOfBirth)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Joined:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {formatDate(userData.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Account Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    User ID:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {userData._id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">
                    Email:{" "}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {userData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
              My Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
