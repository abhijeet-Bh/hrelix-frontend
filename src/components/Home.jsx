import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

export default function Home() {
  const user = useSelector((state) => state.profile);
  return (
    <div className="w-screen h-screen flex">
      {user.status === 200 ? <Sidebar /> : null}
      <div className="flex-1 p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
