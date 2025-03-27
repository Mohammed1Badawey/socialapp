import { Outlet } from "react-router-dom";
import Navbar from './../Navbar/Navbar';

const RootLayout = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Navbar />
      {/* Theme toggle positioned in the top-right corner */}

      <section className="flex min-h-full">
      <Outlet />
      </section>
    </div>
  )
}

export default RootLayout