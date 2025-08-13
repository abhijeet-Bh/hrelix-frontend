import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./Thunks";
import LoadingScreen from "../shared/LoadingScreen";

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, accessToken, dispatch]);

  if (profileLoading) {
    return (
      <div className="absolute bg-white/20 backdrop-blur-sm inset-0 flex justify-center items-center">
        <LoadingScreen />
      </div>
    );
  }

  return children;
}
