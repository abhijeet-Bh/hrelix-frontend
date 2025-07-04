import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
