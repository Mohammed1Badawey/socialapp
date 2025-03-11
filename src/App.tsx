import "./App.css";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import SigninForm from "./Components/_Auth/Forms/SignInForm";
import SignupForms from "./Components/_Auth/Forms/SignupForms";
import { Home } from "./Components/_Root/Pages";
import AuthLayout from "./Components/_Auth/AuthLayout";
import RootLayout from "./Components/_Root/RootLayout";

const App = () => {
  const routes = createBrowserRouter([

        // PublicRoutes
        {
          path: "/",
          element: <AuthLayout/>,
          children: [
            {
              path: "/sign-in",
              element: <SigninForm/>,
            },
            {
              path: "/sign-up",
              element: <SignupForms/>,
            },
          ]
        },

        
        // PrivateRoutes
        {
          path: "/",
          element: <RootLayout/>,
          children: [
            {
              index: true,
              element: <Home/>
            }
          ]
        },

  ]);
  return (
    <>
    <main className="flex h-screen">
      <RouterProvider router={routes} />
    </main>
    </>
  );
}

export default App;
