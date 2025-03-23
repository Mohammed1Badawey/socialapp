import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninForm from "./Components/_Auth/Forms/SignInForm";
import SignupForms from "./Components/_Auth/Forms/SignupForms";
import { Home, UserPosts, SinglePost } from "./Components/_Root/Pages";
import AuthLayout from "./Components/_Auth/AuthLayout";
import RootLayout from "./Components/_Root/RootLayout";
import { Provider } from "react-redux";
import { store } from "./lib/Redux/store";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import UpdatePost from "./Components/UpdatePost";

const App = () => {
  const routes = createBrowserRouter([
    // PublicRoutes
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/sign-in",
          element: <SigninForm />,
        },
        {
          path: "/sign-up",
          element: <SignupForms />,
        },
      ],
    },

    // PrivateRoutes
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          element: (
            <ProtectedRoutes>
              <SinglePost />
            </ProtectedRoutes>
          ),
          path: "/post/:postId",
        },
        {
          element: (
            <ProtectedRoutes>
              <UserPosts />
            </ProtectedRoutes>
          ),
          path: "/user/:userId",
        },
        {
          element: (
            <ProtectedRoutes>
              <UpdatePost />
            </ProtectedRoutes>
          ),
          path: "/edit-post/:postId",
        }
      ],
    },
  ]);
  return (
    <>
      <main className="flex h-screen">
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </main>
    </>
  );
};

export default App;
