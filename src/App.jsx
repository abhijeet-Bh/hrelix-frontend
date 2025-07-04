import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./components/Login";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
