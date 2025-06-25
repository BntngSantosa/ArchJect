import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";

export default function UserLayout() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-[#56DFCF] to-[#FFEDF3]">
      <Sidebar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
