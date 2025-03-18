import { Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import Navbar from './../Navbar/Navbar';

const RootLayout = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Navbar />
      {/* Theme toggle positioned in the top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <section className="flex min-h-full">
      <Outlet />
      </section>
    </div>
  )
}

export default RootLayout