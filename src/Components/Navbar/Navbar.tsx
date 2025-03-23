import { Link } from "react-router-dom";
import img from "../../assets/AuthIMG-dark.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
// import { loggedUser } from "@/lib/Redux/Slices/User/userDataSlice";
// import { store } from "@/lib/Redux/store";

const Navbar = () => {
  // const dispatch = useDispatch<typeof store.dispatch>();
  const userData = useSelector((state: RootState) => state.userData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="bg-blue-600 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="relative flex items-center flex-col md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="flex text-sm bg-gray-800 dark:bg-gray-600 rounded-full md:me-0 active:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <img
                className="w-9 h-9 rounded-full"
                src={userData.photo ? userData.photo : img}
                alt="user photo"
              />
            </button>

            {isMenuOpen && (
              <div className="z-50 absolute top-8 w-32 my-4 text-base bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow-sm">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {userData.name ? userData.name : "User"}
                  </span>
                </div>
                <ul className="py-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className={`items-center justify-between ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col text-white dark:text-gray-300 font-medium p-4 md:p-0 mt-4 border border-gray-100 dark:border-gray-700 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0 hover:text-gray-200 dark:hover:text-white"
                  aria-current="page"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
