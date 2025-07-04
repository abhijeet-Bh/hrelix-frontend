import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./Thunks";
import LoadingScreen from "../components/LoadingScreen";

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
    return <LoadingScreen />;
  }

  return children;
}
