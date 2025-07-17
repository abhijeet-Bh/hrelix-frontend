import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function ErrorSessionExpired({ error }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {error}
      <div
        className={`
          shadow-md hover:bg-red-500 transition-all delay-75 
        "w-full px-8 justify-between"
          text-white font-bold
          h-150 mt-6 py-2 flex flex-row cursor-pointer items-center bg-red-400 rounded-md
        `}
        onClick={handleLogout}
      >
        Login
      </div>
    </div>
  );
}
