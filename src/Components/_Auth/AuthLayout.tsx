import {Outlet, Navigate} from "react-router-dom";
import AuthIMG_Dark from "../../Assets/side-img.svg";
import ThemeToggle from "../ThemeToggle";

const AuthLayout = () => {
  const isLoggedIn = false;
  return (
    <>
 { isLoggedIn ? ( <Navigate to="/"/>) : (
  <>
  <section className="flex flex-col flex-1 justify-center items-center py-10 relative">
    {/* Theme toggle positioned in the top-right corner */}
    <div className="absolute top-4 right-4">
      <ThemeToggle />
    </div>
    <Outlet/>
  </section>
  <img src={AuthIMG_Dark} alt="AuthIMG" className="hidden lg:block w-[40%] object-cover bg-no-repeat" />
  </>
 )}
 </> 
)};

export default AuthLayout;
