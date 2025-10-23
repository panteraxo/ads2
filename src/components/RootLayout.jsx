import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function RootLayout() {
  return (
    <div className="flex min-h-screen bg-blue-950">
      <div className="sticky top-0 overflow-y-auto shadow-xl">
        <Sidebar />
      </div>

      <main className="flex-1 mx-auto px-6 py-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
export default RootLayout;
