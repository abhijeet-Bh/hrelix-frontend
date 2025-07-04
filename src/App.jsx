import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import { HeroUIProvider } from "@heroui/react";
import { useSelector } from "react-redux";
import Home from "./components/Home";

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={auth.isAuthenticated ? <Home /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
