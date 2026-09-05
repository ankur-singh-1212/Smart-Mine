import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-[#f7f9fb] text-[#191c1e]">
      <Sidebar />
      <div className="flex-1 md:ml-[280px] min-h-screen flex flex-col">
        <TopNavbar />
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] mx-auto w-full pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileNavbar />
    </div>
  );
}