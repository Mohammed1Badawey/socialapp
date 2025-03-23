import { useState, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { store } from "@/lib/Redux/store";
import { changePassword } from "@/lib/Redux/Slices/User/changePasswordSlice";
import { uploadPhoto } from "@/lib/Redux/Slices/User/uploadPhotoSlice";
import { loggedUser } from "@/lib/Redux/Slices/User/userDataSlice";
import { resetChangePasswordState } from "@/lib/Redux/Slices/User/changePasswordSlice";
import { resetUploadPhotoState } from "@/lib/Redux/Slices/User/uploadPhotoSlice";
import staticUserImg from "@/assets/user.svg";

const Settings = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userData = useSelector((state: RootState) => state.userData);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Photo upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Get states from Redux store
  const changePasswordState = useSelector(
    (state: RootState) => state.changePassword
  );
  const uploadPhotoState = useSelector((state: RootState) => state.uploadPhoto);

  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Handle password form submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New passwords don't match");
      return;
    }

    // Dispatch change password action
    dispatch(
      changePassword({
        password: passwordData.password,
        newPassword: passwordData.newPassword,
      })
    );
  };

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size (max 4MB)
      if (file.size > 4 * 1024 * 1024) {
        alert("File size exceeds 4MB limit");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    dispatch(uploadPhoto(formData)).then(() => {
      // Refresh user data to get updated photo
      dispatch(loggedUser());
    });
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset states when component unmounts
  const resetStates = () => {
    dispatch(resetChangePasswordState());
    dispatch(resetUploadPhotoState());
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Account Settings
        </h1>

        {/* Photo Upload Section */}
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Profile Photo
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <img src={userData.photo? userData.photo : staticUserImg  } alt="" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <input
                aria-label="Upload profile photo"
                title="Choose a profile photo to upload"
                placeholder="Select a profile photo"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Select New Photo
              </button>

              {selectedFile && (
                <button
                  type="button"
                  onClick={handlePhotoUpload}
                  disabled={uploadPhotoState.isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
                >
                  {uploadPhotoState.isLoading ? "Uploading..." : "Upload Photo"}
                </button>
              )}

              {uploadPhotoState.success && (
                <div className="text-green-600 dark:text-green-400 mt-2">
                  {uploadPhotoState.message}
                </div>
              )}

              {uploadPhotoState.error && (
                <div className="text-red-600 dark:text-red-400 mt-2">
                  {uploadPhotoState.error}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={passwordData.password}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={changePasswordState.isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {changePasswordState.isLoading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>
            </div>

            {changePasswordState.success && (
              <div className="text-green-600 dark:text-green-400 mt-2">
                {changePasswordState.message}
              </div>
            )}

            {changePasswordState.error && (
              <div className="text-red-600 dark:text-red-400 mt-2">
                {changePasswordState.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
