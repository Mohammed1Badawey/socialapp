
import { Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const RootLayout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Theme toggle positioned in the top-right corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  )
}

export default RootLayout